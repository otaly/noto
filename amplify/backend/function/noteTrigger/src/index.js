/* Amplify Params - DO NOT EDIT
	API_NOTOGQL_GRAPHQLAPIENDPOINTOUTPUT
	API_NOTOGQL_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { removeRecordDependencies } = require('./removeRecordDependencies');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const promises = [];

  event.Records.forEach(async (record) => {
    if (record.eventName === 'REMOVE') {
      promises.push(removeRecordDependencies(record));
    }
  });
  await Promise.all(promises).catch((err) => console.error(err));
  return Promise.resolve('Successfully processed DynamoDB record');
};
