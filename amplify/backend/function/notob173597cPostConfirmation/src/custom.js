require('isomorphic-fetch');
const aws = require('aws-sdk');
const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');

const createUserMutation = gql`
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

let graphqlClient;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const env = process.env;
  const graphql_auth = {
    type: 'AWS_IAM',
    credentials: () => aws.config.credentials,
  };

  if (!graphqlClient) {
    graphqlClient = new AWSAppSyncClient({
      url: env.API_NOTOGQL_GRAPHQLAPIENDPOINTOUTPUT,
      region: env.REGION,
      auth: graphql_auth,
      disableOffline: true,
    });
  }

  await createUser({
    id: event.userName,
    name: event.request.userAttributes.name || '匿名ユーザー',
  });

  return event;
};

const createUser = async ({ id, name }) => {
  const userInput = {
    mutation: createUserMutation,
    variables: {
      input: {
        id,
        name,
      },
    },
  };
  return graphqlClient.mutate(userInput);
};
