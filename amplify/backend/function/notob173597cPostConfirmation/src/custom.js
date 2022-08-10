const gql = require('graphql-tag');
const { graphqlClient } = require('/opt/graphqlClient');

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

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
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
