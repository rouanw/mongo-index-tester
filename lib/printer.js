const chalk = require('chalk');

const stagePrinters = {
  FETCH: ({ filter, docsExamined }) => `Examined ${docsExamined} documents, using filter ${JSON.stringify(filter)}`,
  IXSCAN: ({ indexName, direction, keysExamined }) => `Examined ${keysExamined} keys on index ${chalk.green(indexName)} in a ${direction} direction`,
};

const printStage = (result, stage, index, arr) => {
  return `${result}
  ${arr.length - index}. ${stage.description} (${stage.stage}):
  Took around ${chalk.green(`${stage.executionTimeMillisEstimate}  milliseconds`)} and returned ${chalk.green(`${stage.nReturned} documents`)}
  ${stagePrinters[stage.stage] && stagePrinters[stage.stage](stage)}
  `;
};

module.exports = (query, { executionStats, stages }) => `
  ${chalk.blue('Results for query:')}
  ${JSON.stringify(query)}

  The query took ${chalk.green(`${executionStats.executionTimeMillis} milliseconds`)} to run.
  ${executionStats.totalKeysExamined} keys and ${executionStats.totalDocsExamined} documents were examined.

  ${stages.reduce(printStage, chalk.blue('Stages:'))}
`;