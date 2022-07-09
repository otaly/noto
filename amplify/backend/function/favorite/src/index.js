/* Amplify Params - DO NOT EDIT
	API_NOTOGQL_GRAPHQLAPIENDPOINTOUTPUT
	API_NOTOGQL_GRAPHQLAPIIDOUTPUT
	API_NOTOGQL_NOTETABLE_ARN
	API_NOTOGQL_NOTETABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

require('isomorphic-fetch');
const aws = require('aws-sdk');
const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');
const { env } = require('process');

const createFavorite = gql`
  mutation CreateFavorite(
    $input: CreateFavoriteInput!
    $condition: ModelFavoriteConditionInput
  ) {
    createFavorite(input: $input, condition: $condition) {
      userId
      noteId
      createdAt
    }
  }
`;
const deleteFavorite = gql`
  mutation DeleteFavorite(
    $input: DeleteFavoriteInput!
    $condition: ModelFavoriteConditionInput
  ) {
    deleteFavorite(input: $input, condition: $condition) {
      userId
      noteId
      createdAt
    }
  }
`;

let graphqlClient;
let dynamoClient;

const resolvers = {
  Mutation: {
    changeFavorite: (event) => {
      if (!event.arguments.input) {
        throw new Error('input is undefined.');
      }
      return event.arguments.input.isFavorite
        ? addFavorite(event)
        : removeFavorite(event);
    },
  },
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, _, callback) => {
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
  if (!dynamoClient) {
    dynamoClient = new aws.DynamoDB.DocumentClient({
      region: env.REGION,
      apiVersion: '2012-08-10',
    });
  }

  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return await resolver(event);
    }
  }
  throw new Error('Resolver not found.');
};

// TODO: 既にお気に入り済みだった場合を考慮
const addFavorite = async (event) => {
  const noteId = event.arguments.input.noteId;
  const promises = [];
  promises.push(addFavoriteCount(noteId, 1));

  // TODO: 対象ノートが存在するかのチェック
  promises.push(
    graphqlClient.mutate({
      mutation: createFavorite,
      variables: {
        input: {
          userId: event.identity.username,
          noteId,
        },
      },
    })
  );

  await Promise.all(promises);
  return genResponse(event);
};

// TODO: 既にお気に入り削除済みだった場合を考慮
const removeFavorite = async (event) => {
  const noteId = event.arguments.input.noteId;
  const promises = [];
  promises.push(addFavoriteCount(noteId, -1));

  // TODO: 対象ノートが存在するかのチェック
  promises.push(
    graphqlClient.mutate({
      mutation: deleteFavorite,
      variables: {
        input: {
          userId: event.identity.username,
          noteId,
        },
      },
    })
  );

  await Promise.all(promises);
  return genResponse(event);
};

const genResponse = (event) => event.arguments.input;

const addFavoriteCount = (noteId, incr) => {
  // 同時更新されても問題無いようアトミックカウンタを使う
  return dynamoClient
    .update({
      TableName: env.API_NOTOGQL_NOTETABLE_NAME,
      ReturnValues: 'ALL_NEW',
      Key: {
        id: noteId,
      },
      UpdateExpression: 'ADD favoriteCount :incr',
      ExpressionAttributeValues: { ':incr': incr },
    })
    .promise();
};
