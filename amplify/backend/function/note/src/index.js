/* Amplify Params - DO NOT EDIT
	API_NOTOGQL_GRAPHQLAPIENDPOINTOUTPUT
	API_NOTOGQL_GRAPHQLAPIIDOUTPUT
	ENV
	FUNCTION_CONVERTMD_NAME
	REGION
Amplify Params - DO NOT EDIT */

const aws = require('aws-sdk');
const gql = require('graphql-tag');
const { graphqlClient } = require('/opt/graphqlClient');
const { env } = require('process');

const MAX_TITLE_LENGTH = 70;
const MAX_MARKDOWN_LENGTH = 20000;

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
  validate({ title, markdown });

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
  validate({ title, markdown });

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

const validate = ({ title, markdown }) => {
  const errors = [];

  if (title.length > MAX_TITLE_LENGTH) {
    errors.push(
      `Title should be no longer than ${MAX_TITLE_LENGTH} characters.`
    );
  }
  if (markdown.length > MAX_MARKDOWN_LENGTH) {
    errors.push(
      `Markdown should be no longer than ${MAX_MARKDOWN_LENGTH} characters.`
    );
  }

  if (errors.length > 0) {
    throw new Error(errors.join('\n'));
  }
};
