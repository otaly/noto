export const listFavoriteIds = /* GraphQL */ `
  query ListFavoriteIds($userId: ID) {
    listFavorites(userId: $userId) {
      items {
        noteId
      }
    }
  }
`;
