/* Amplify Params - DO NOT EDIT
	API_NOTOGQL_GRAPHQLAPIENDPOINTOUTPUT
	API_NOTOGQL_GRAPHQLAPIIDOUTPUT
	ENV
	FUNCTION_CONVERTMD_NAME
	REGION
Amplify Params - DO NOT EDIT */

require('isomorphic-fetch');
const aws = require('aws-sdk');
const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');
const { env } = require('process');

const createNoteMutation = gql`
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      title
      markdown
      html
      authorId
      author {
        id
        name
        createdAt
        updatedAt
      }
      favoriteCount
      type
      updatedAt
      createdAt
    }
  }
`;

const updateNoteMutation = gql`
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      title
      markdown
      html
      authorId
      author {
        id
        name
        createdAt
        updatedAt
      }
      favoriteCount
      type
      updatedAt
      createdAt
    }
  }
`;

let graphqlClient;
let lambda;

const resolvers = {
  Mutation: {
    createNoteForClient: (event) => createNote(event),
    updateNoteForClient: (event) => updateNote(event),
  },
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
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
  if (!lambda) {
    lambda = new aws.Lambda();
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

const createNote = async (event) => {
  const { title, markdown } = event.arguments.input;
  const html = await markdownToHtml(markdown);

  const result = await graphqlClient.mutate({
    mutation: createNoteMutation,
    variables: {
      input: {
        title,
        markdown,
        html,
        authorId: event.identity.username,
        type: 'note',
      },
    },
  });
  return result.data?.createNote;
};

const updateNote = async (event) => {
  const { id, title, markdown } = event.arguments.input;
  const html = await markdownToHtml(markdown);

  const result = await graphqlClient.mutate({
    mutation: updateNoteMutation,
    variables: {
      input: {
        id,
        title,
        markdown,
        html,
      },
    },
  });
  return result.data?.updateNote;
};

const markdownToHtml = async (markdown) => {
  const result = await lambda
    .invoke({
      FunctionName: env.FUNCTION_CONVERTMD_NAME,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({ arguments: { markdown } }),
    })
    .promise();
  return JSON.parse(result.Payload);
};
