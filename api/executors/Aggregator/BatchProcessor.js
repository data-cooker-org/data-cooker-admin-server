const db = require('../../models');
const ChunkProcessor = require('./ChunkProcessor');
const ShellCommander = require('./ShellCommander');

const BatchProcessor = (targetData, scriptOnly, logDetails) => {
	const nonEnabled = false;
	var batchControlColumn = '',
		batchControlSize = 0,
		batchScheduleType = '',
		batchLoopTag = '',
		batchLoopEnd = '',
		batchScheduleCurrent;
	var loopScript = '',
		pageBreaker = '',
		loopSegmenter = '',
		callStatus = '',
		callResult = '(SP call parameter script_only is presented true)';

	var targetQuery = `
			SELECT "batchControlColumn",
				"batchControlSize",
				"batchScheduleType",
				"batchProcessed" + CASE "batchScheduleType"
						WHEN 'MINUTES' THEN "batchControlSize"
						WHEN 'HOURLY' THEN 60
						ELSE 1440
					END * INTERVAL '1 minute' "batchLoopBegin",
				"batchPossible" "batchLoopEnd",
				"batchScheduleCurrent"
			FROM (
				SELECT "batchControlColumn",
					"batchControlSize",
					"batchControlNext",
					"batchProcessed",
					"batchProcessing",
					"batchScheduleType",
					"batchScheduleLast",
					CURRENT_TIMESTAMP "batchScheduleCurrent",
					CASE "batchScheduleType"
							WHEN 'HOURLY' THEN DATE_TRUNC('HOUR', "batchScheduleCurrent")
							WHEN 'DAILY' THEN DATE_TRUNC('DAY', "batchScheduleCurrent")
							ELSE '1970-01-01'::timestamp + (FLOOR((EXTRACT(EPOCH FROM "batchScheduleCurrent") - 0)/(60*"batchControlSize"))*"batchControlSize") * INTERVAL '1 minute'
							END "batchPossible"
				FROM (
					SELECT "batchControlColumn",
						"batchControlSize",
						"batchControlNext",
						"batchProcessed",
						"batchProcessing",
						"batchScheduleType",
						"batchScheduleLast",
						CURRENT_TIMESTAMP "batchScheduleCurrent"
					FROM public."agg_Targets"
 					WHERE "targetData" = :targetData
					) a
				) b
			WHERE "batchProcessing" IS NULL
			--OR ("batchPossible" > "batchScheduleLast" + "batchControlSize" * INTERVAL '1 minute');
			OR ("batchScheduleCurrent" > "batchScheduleLast" + INTERVAL '3 minutes');
			`;
	db.sequelize.query(targetQuery, {
		replacements: { targetData: targetData },
		logging: false,
		raw: false,
		type: db.sequelize.QueryTypes.SELECT
	}).then(target => {
		if (target.length === 0) { return 'No target "' + targetData + '" is configured or a processing was not complete properly!' }
		batchControlColumn = target[0].batchControlColumn;
		batchControlSize = target[0].batchControlSize;
		batchScheduleType = target[0].batchScheduleType;
		batchLoopTag = target[0].batchLoopBegin;
		batchLoopEnd = target[0].batchLoopEnd;
		batchScheduleCurrent = target[0].batchScheduleCurrent;

		var contextQuery = `
			UPDATE public."agg_Targets"
			SET "batchProcessing" = :batchLoopEnd
				,"batchScheduleLast" = :batchScheduleCurrent
			WHERE "targetData" = :targetData;
			`;
		if (!scriptOnly) {
			db.sequelize.query(contextQuery, {
				replacements: { targetData: targetData, batchLoopEnd: batchLoopEnd, batchScheduleCurrent: batchScheduleCurrent },
				logging: false,
				raw: false,
				type: db.sequelize.QueryTypes.UPDATE
			});
		}

		while (batchLoopTag <= batchLoopEnd) {
			var contextQuery = `
				UPDATE public."agg_Targets"
				SET "batchMicroChunkCurrent" = :batchLoopTag
				WHERE "targetData" = :targetData;
				`;
			if (!scriptOnly) {
				db.sequelize.query(contextQuery, {
					replacements: { targetData: targetData, batchLoopTag: batchLoopTag },
					logging: false,
					raw: false,
					type: db.sequelize.QueryTypes.UPDATE
				});
			}

			var deleteQuery = `DELETE FROM ` + targetData
				+ ` WHERE ` + batchControlColumn + ` >= :1`
				+ ` AND ` + batchControlColumn + ` < DATEADD(MINUTE, :2, :1);\n`;
			ShellCommander(deleteQuery);

			var deleteScheduled = deleteQuery
				.replace(/:2/g, batchControlSize.toString())
				.replace(/:1/g, '\'' + batchLoopTag.toISOString() + '\'');

			var callQuery = `CALL DATA_AGGREGATOR (:1, :2, :3, :4, :5);\n`;
			var callScheduled = callQuery
				.replace(/:1/g, '\'' + targetData + '\'')
				.replace(/:2/g, scriptOnly.toString())
				.replace(/:3/g, logDetails.toString())
				.replace(/:4/g, nonEnabled.toString())
				.replace(/:5/g, '\'' + batchLoopTag.toISOString() + '\'');

			loopSegmenter = pageBreaker + '-'.repeat(65)
				+ `\n-- LOOP FRAME: ` + batchControlColumn + ` = ` + batchLoopTag.toISOString()
				+ `\n-- LOOP CHUNK: ` + batchControlSize.toString() + ` minutes by ` + batchControlColumn
				+ `\n` + '-'.repeat(65) + `\n`;
			loopScript = loopScript + loopSegmenter + deleteScheduled + callScheduled;
			pageBreaker = `\n\n`;

			console.log(loopSegmenter);
			if (!scriptOnly) {
				try {
					// var removalStmt = snowflake.createStatement({
					// 	sqlText: deleteQuery,
					// 	binds: [batchLoopTag.toISOString(), batchControlSize]
					// });
					// removalStmt.execute();
					callStatus = 'PASS';
					callResult = '[INFO-1] Successfully deleted the existing data for reloading';
				}
				catch (err) {
					callStatus = 'FAIL';
					callResult = '[FAIL] Failure to delete the existing data from target table => ' + err
				}
				finally {
					if (logDetails || callStatus.startsWith('FAIL')) {
						var logQuery = 'INSERT INTO DATA_AGGREGATION_LOGGING(EVENT_TARGET, EVENT_SOURCE, EVENT_STATUS, EVENT_STATE, EVENT_QUERY) VALUES(:1, :2, :3, :4, :5)';
						// var logStmt = snowflake.createStatement({
						// 	sqlText: logQuery,
						// 	binds: [targetData, '(*** All loaded data covered by current batch ***)', callStatus, callResult, deleteScheduled]
						// });
						// logStmt.execute()
					}
				}

				if (logDetails) {
					var logQuery = 'INSERT INTO DATA_AGGREGATION_LOGGING(EVENT_TARGET, EVENT_SOURCE, EVENT_STATUS, EVENT_STATE, EVENT_QUERY) VALUES(:1, :2, :3, :4, :5)';
					// var logStmt = snowflake.createStatement({
					// 	sqlText: logQuery,
					// 	binds: [targetData, '(*** All enabled data sources ***)', 'INFO', '[INFO-2] Make a batch data load call', callScheduled]
					// });
					// logStmt.execute()
				}

				try {
					// var callStmt = snowflake.createStatement({
					// 	sqlText: callQuery,
					// 	binds: [targetData, SCRIPT_ONLY.toString(), logDetails.toString(), nonEnabled.toString(), batchLoopTag.toISOString()]
					// });
					// callStmt.execute();
					const SourceResult = ChunkProcessor(targetData, scriptOnly, logDetails, nonEnabled, batchLoopTag.toISOString());
					// cpnsole.log(SourceResult);
					callStatus = 'PASS';
					callResult = '[INFO-2] Successfully completed the batch load call';
				}
				catch (err) {
					callStatus = 'FAIL';
					callResult = '[FAIL] Failure to complete the batch load call => ' + err
				}
				finally {
					if (logDetails || callStatus.startsWith('FAIL')) {
						var logQuery = 'INSERT INTO DATA_AGGREGATION_LOGGING(EVENT_TARGET, EVENT_SOURCE, EVENT_STATUS, EVENT_STATE, EVENT_QUERY) VALUES(:1, :2, :3, :4, :5)';
						// var logStmt = snowflake.createStatement({
						// 	sqlText: logQuery,
						// 	binds: [targetData, '', callStatus, callResult, callScheduled]
						// });
						// logStmt.execute()
					}
				}
			}
			batchLoopTag.setMinutes(batchLoopTag.getMinutes() + batchControlSize);
		}

		var contextQuery = `
			UPDATE public."agg_Targets" T
			SET "batchProcessing" = null
				,"batchMicroChunkCurrent" = null
			--	,"batchProcessed" = B."SourceReadyTime"
			FROM ( 
				SELECT D."targetData", 
					MIN(COALESCE(S."sourceReadyTime", D."batchProcessed")) "SourceReadyTime"
				FROM public."agg_Targets" D
				JOIN public."agg_Sources" S
				ON D."id" = S."targetId"
				WHERE S."sourceEnabled" = true
				GROUP BY D."targetData"
				) B
			WHERE T."targetData" = B."targetData"
				AND T."targetData" = :targetData;
			`;
		if (!scriptOnly) {
			db.sequelize.query(contextQuery, {
				replacements: { targetData: targetData },
				logging: false,
				raw: false,
				type: db.sequelize.QueryTypes.UPDATE
			});
		}

		return loopScript;
	});
};

module.exports = BatchProcessor;
