const gql = require('graphql-tag');
const { graphqlClient } = require('/opt/graphqlClient');

const favoritesByNoteId = gql`
  query FavoritesByNoteId($noteId: ID!, $nextToken: String) {
    favoritesByNoteId(noteId: $noteId, nextToken: $nextToken) {
      items {
        userId
        noteId
      }
      nextToken
    }
  }
`;

const deleteFavorite = gql`
  mutation DeleteFavorite($input: DeleteFavoriteInput!) {
    deleteFavorite(input: $input) {
      userId
      noteId
    }
  }
`;

// ノートに紐づくお気に入りを再帰的に取得
const listFavorites = async (id, nextToken = null, items = []) => {
  let result;
  try {
    result = await graphqlClient.query({
      query: favoritesByNoteId,
      variables: {
        noteId: id,
        nextToken: nextToken,
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
  const favorites = result.data.favoritesByNoteId;
  items = [...items, ...favorites.items];

  if (favorites.nextToken) {
    return listFavorites(id, favorites.nextToken, items);
  } else {
    return items;
  }
};

const removeRecordDependencies = async (record) => {
  let noteId = record.dynamodb.OldImage.id.S;

  let favorites = await listFavorites(noteId);

  const promises = favorites.map((favorite) =>
    graphqlClient.mutate({
      mutation: deleteFavorite,
      variables: {
        input: {
          userId: favorite.userId,
          noteId: favorite.noteId,
        },
      },
    })
  );
  await Promise.all(promises);
};

exports.removeRecordDependencies = removeRecordDependencies;
