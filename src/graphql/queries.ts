/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      title
      content
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
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
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
      nextToken
    }
  }
`;
export const notesByAuthorAndDate = /* GraphQL */ `
  query NotesByAuthorAndDate(
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
        content
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
      nextToken
    }
  }
`;
export const notesByDate = /* GraphQL */ `
  query NotesByDate(
    $type: String!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notesByDate(
      type: $type
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        content
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
      nextToken
    }
  }
`;
export const getFavorite = /* GraphQL */ `
  query GetFavorite($userId: ID!, $createdAt: AWSDateTime!) {
    getFavorite(userId: $userId, createdAt: $createdAt) {
      userId
      createdAt
      noteId
      note {
        id
        title
        content
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
  }
`;
export const listFavorites = /* GraphQL */ `
  query ListFavorites(
    $userId: ID
    $createdAt: ModelStringKeyConditionInput
    $filter: ModelFavoriteFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFavorites(
      userId: $userId
      createdAt: $createdAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
        createdAt
        noteId
        note {
          id
          title
          content
          authorId
          favoriteCount
          type
          updatedAt
          createdAt
        }
      }
      nextToken
    }
  }
`;
