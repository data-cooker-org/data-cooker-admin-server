const db = require('../../models');
const ShellCommander = require('./ShellCommander');

const ChunkProcessor = (targetData, scriptOnly, logDetails, nonEnabled, batchTimeTag) => {
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

				ShellCommander(loadQuery);
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

module.exports = ChunkProcessor;
