export const onCreateFavoriteId = /* GraphQL */ `
  subscription OnCreateFavoriteId($userId: String) {
    onCreateFavorite(userId: $userId) {
      noteId
    }
  }
`;

export const onDeleteFavoriteId = /* GraphQL */ `
  subscription OnDeleteFavoriteId($userId: String) {
    onDeleteFavorite(userId: $userId) {
      noteId
    }
  }
`;
