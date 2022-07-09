export const listFavoriteIds = /* GraphQL */ `
  query ListFavoriteIds($userId: ID) {
    listFavorites(userId: $userId) {
      items {
        noteId
      }
    }
  }
`;

export const listNotesByAuthor = /* GraphQL */ `
  query ListNotesByAuthor(
    $authorId: ID!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notesByAuthorAndDate(
      authorId: $authorId
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        markdown
        authorId
        author {
          id
          name
        }
        favoriteCount
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;

export const listNotes = /* GraphQL */ `
  query ListNotes(
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notesByDate(
      type: "note"
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        markdown
        authorId
        author {
          id
          name
        }
        favoriteCount
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;

export const listFavoritesByUserId = /* GraphQL */ `
  query ListFavoritesByUserId(
    $userId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFavoriteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    favoritesByDate(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        userId
        noteId
        createdAt
        note {
          id
          title
          markdown
          authorId
          favoriteCount
          updatedAt
          createdAt
        }
      }
      nextToken
    }
  }
`;
