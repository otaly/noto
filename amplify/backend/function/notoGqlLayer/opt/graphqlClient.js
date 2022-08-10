require('isomorphic-fetch');
const aws = require('aws-sdk');
const AWSAppSyncClient = require('aws-appsync').default;
const { env } = require('process');

const graphql_auth = {
  type: 'AWS_IAM',
  credentials: () => aws.config.credentials,
};

const graphqlClient = new AWSAppSyncClient({
  url: env.API_NOTOGQL_GRAPHQLAPIENDPOINTOUTPUT,
  region: env.REGION,
  auth: graphql_auth,
  disableOffline: true,
});

exports.graphqlClient = graphqlClient;
