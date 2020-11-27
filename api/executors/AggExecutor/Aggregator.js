const db = require('../../models');

const Aggregator = () => {
	const SoureProcessor = (targetData, scriptOnly, logDetails, nonEnabled, batchTimeTag) => {
		let pageBreaker = '', sqlScript = '';
		const query = `
			SELECT
				d."targetData",
				d."batchControlColumn",
				d."batchControlSize",
				d."batchControlNext",
				d."patternColumns",
				d."groupByColumns",
				CASE WHEN "groupByFlexible" THEN (d."groupByPattern" | s."patternDefault") ELSE d."groupByPattern" END "groupByPattern",
				d."groupByFlexible" OR (d."groupByPattern" = (d."groupByPattern" | s."patternDefault")) "groupByCompatible",
				d."groupByFlexible" AND s."patternFlexible" "patternFlexible",
				d."aggregateColumns",
				d."aggregateFunctions",
				d."supportSpVersions",
				s."sourceLabel",
				s."sourceData",
				s."transformation"
			FROM public."agg_Targets" AS d
			JOIN public."agg_Sources" AS s
			ON d.id = s."targetId"
			WHERE d."targetData" = :targetData
			AND s."sourceEnabled" != :sourceEnabled;
			`;
		db.sequelize.query(query, {
			replacements: { targetData: targetData, sourceEnabled: nonEnabled },
			logging: false,
			raw: false,
			type: db.sequelize.QueryTypes.SELECT
		}).then(sources => {
			sources.forEach(source => {
				var targetData = source.targetData;
				var batchControlColumn = source.batchControlColumn;
				var batchControlSize = source.batchControlSize;
				var batchControlNext = source.batchControlNext;
				var patternColumns = source.patternColumns;
				var groupByColumns = source.groupByColumns.map(x => x.split(':')[1]);
				var dimensionColumns = source.groupByColumns.map(x => x.split(':')[0]);
				var groupByPattern = source.groupByPattern
				var groupByCompatible = source.groupByCompatible;
				var patternFlexible = source.patternFlexible
				var aggregateColumns = source.aggregateColumns.map(x => x.split(':')[1]);
				var measureColumns = source.aggregateColumns.map(x => x.split(':')[0]);
				var aggregateFunctions = source.aggregateFunctions;
				var supportSpVersions = source.supportSpVersions;
				var sourceLabel = source.sourceLabel;
				var sourceData = source.sourceData;
				var transformation = source.transformation;
				var sourceTitle = '',
					sqlExecuted = '',
					sqlStatus = '',
					sqlResult = '(SP call parameter scriptOnly is presented true)';

				if (transformation) { transformation = '(' + transformation + ')' } else { transformation = sourceData }

				if (groupByCompatible) {
					var flagIndexLast = patternColumns.length - 1,
						patternSegment = groupByPattern;
					var selectList = groupByColumns[0] === "DATA_PATTERN" ? (patternFlexible ? 'BITOR(' + groupByColumns[0] + ',' + groupByPattern + ')' : groupByPattern) + ' ' : '',
						dimensionList = '',
						groupByList = '',
						columnSplitter = '';
					for (var i = 0; i <= flagIndexLast; i++) {
						var flagPower = 2 ** (flagIndexLast - i);
						if (patternSegment / flagPower < 1) {
							dimensionList = dimensionList + columnSplitter + dimensionColumns[groupByColumns.indexOf(patternColumns[i])];
							selectList = selectList + columnSplitter + patternColumns[i];
							groupByList = groupByList + columnSplitter + patternColumns[i];
							columnSplitter = ',';
						}
						patternSegment %= flagPower;
					}

					var targetAlias = 'T.', sourceAlias = 'S.';
					var loadQuery = `MERGE INTO ` + targetData + ` ` + targetAlias[0] + ` \n`
						+ `USING ( \n`
						+ `  SELECT ` + groupByList + `,`
						+ aggregateFunctions.map((x, i) => { return x.replace('?', aggregateColumns[i]) + ' ' + aggregateColumns[i] }) + ` \n`
						+ `  FROM ( \n`
						+ `    SELECT ` + selectList + `,` + aggregateColumns + ` \n`
						+ `    FROM ` + transformation + ` \n`
						+ `    WHERE ` + batchControlColumn + ` >= :1 AND ` + batchControlColumn + ` < ` + batchControlNext + ` \n`
						+ `    ) \n`
						+ `  GROUP BY ` + groupByList + `\n`
						+ `  ) ` + sourceAlias[0] + ` \n`
						+ `ON ` + dimensionList.split(',').map((x, i) => { return `COALESCE(TO_CHAR(` + targetAlias + x + `),'') = COALESCE(TO_CHAR(` + sourceAlias + groupByList.split(',')[i] + `),'')` }).join('\n AND ') + ` \n`
						+ `WHEN MATCHED THEN UPDATE SET ` + measureColumns.map((x, i) => { return x + ' = ' + sourceAlias[0] + `.` + aggregateColumns[i] }) + ` \n`
						+ `WHEN NOT MATCHED THEN INSERT(` + dimensionList + `,` + measureColumns + `) \n`
						+ `VALUES (` + groupByList.split(',').map(x => { return sourceAlias[0] + `.` + x }) + `,`
						+ aggregateColumns.map(x => { return sourceAlias[0] + `.` + x }) + `);`;

					sqlExecuted = loadQuery.replace(/:2/g, batchControlSize).replace(/:1/g, "'" + batchTimeTag + "'");

					if (!scriptOnly) {
						try {
							// var loadStmt = snowflake.createStatement({
							// 	sqlText: loadQuery,
							// 	binds: [batchTimeTag, batchControlSize]
							// });
							// loadStmt.execute();
							sqlStatus = 'PASS';
							sqlResult = '[INFO-1] Successfully loaded data into target table'
						}
						catch (err) {
							sqlStatus = 'FAIL';
							sqlResult = '[FAIL] Failure to load data into target table => ' + err
						}
						finally {
							if (logDetails || sqlStatus.startsWith('FAIL')) {
								var logQuery = 'INSERT INTO DATA_AGGREGATION_LOGGING(EVENT_TARGET, EVENT_SOURCE, EVENT_STATUS, EVENT_STATE, EVENT_QUERY) VALUES(:1, :2, :3, :4, :5)';
								// var logStmt = snowflake.createStatement({
								// 	sqlText: logQuery,
								// 	binds: [targetData, sourceData, sqlStatus, sqlResult, sqlExecuted]
								// });
								// logStmt.execute()
							}
						}
					}
				}
				else {
					sqlExecuted = '-- No data is loaded from this source as the data pattern is incompatible!';
				}

				sourceTitle = pageBreaker + '-'.repeat(65)
					+ `\n-- SOURCE_LABEL: ` + sourceLabel
					+ `\n-- SOURCE_DATA: ` + sourceData.replace('DATAMART.BUYSIDE_NETWORK.', '').replace('DATAMART.SELLSIDE_NETWORK.', '')
					+ `\n-- SOURCE STATE: ` + sqlResult
					+ `\n` + '-'.repeat(65) + `\n`;
				sqlScript = sqlScript + sourceTitle + sqlExecuted;
				pageBreaker = `\n\n`;
			});
			console.log(sqlScript);
			return sqlScript;
		});
	};

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
			OR ("batchPossible" > "batchScheduleLast" + "batchControlSize" * INTERVAL '1 minute');`;
		db.sequelize.query(targetQuery, {
			replacements: { targetData: targetData },
			logging: false,
			raw: false,
			type: db.sequelize.QueryTypes.SELECT
		}).then(target => {
			batchControlColumn = target[0].batchControlColumn
			batchControlSize = target[0].batchControlSize;
			batchScheduleType = target[0].batchScheduleType;
			batchLoopTag = target[0].batchLoopBegin;
			batchLoopEnd = target[0].batchLoopEnd;
			batchScheduleCurrent = target[0].batchScheduleCurrent;
			while (batchLoopTag <= batchLoopEnd) {
				// var contextQuery = `UPDATE DATA_AGGREGATION_TARGETS \n `
				// 	+ `SET BATCH_MICROCHUNK_CURRENT = :2 \n `
				// 	+ `WHERE targetData = :1;`;
				// var contextStmt = snowflake.createStatement({
				// 	sqlText: contextQuery,
				// 	binds: [targetData, batchLoopTag.toISOString()]
				// });
				// if (!SCRIPT_ONLY) { contextStmt.execute(); }

				var deleteQuery = `DELETE FROM ` + targetData
					+ ` WHERE ` + batchControlColumn + ` >= :1`
					+ ` AND ` + batchControlColumn + ` < DATEADD(MINUTE, :2, :1);\n`;
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
						const SourceResult = SoureProcessor(targetData, scriptOnly, logDetails, nonEnabled, batchLoopTag.toISOString());
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
			return loopScript;
		});
	};

	return {
		SoureProcessor,
		BatchProcessor
	};
};


module.exports = Aggregator;
