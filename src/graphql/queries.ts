/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getNote = /* GraphQL */ `query GetNote($id: ID!) {
  getNote(id: $id) {
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
      __typename
    }
    favoriteCount
    type
    updatedAt
    createdAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetNoteQueryVariables, APITypes.GetNoteQuery>;
export const notesByAuthorAndDate = /* GraphQL */ `query NotesByAuthorAndDate(
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
      html
      authorId
      author {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      favoriteCount
      type
      updatedAt
      createdAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.NotesByAuthorAndDateQueryVariables,
  APITypes.NotesByAuthorAndDateQuery
>;
export const notesByDate = /* GraphQL */ `query NotesByDate(
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
      markdown
      html
      authorId
      author {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      favoriteCount
      type
      updatedAt
      createdAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.NotesByDateQueryVariables,
  APITypes.NotesByDateQuery
>;
export const listFavorites = /* GraphQL */ `query ListFavorites(
  $userId: ID
  $noteId: ModelIDKeyConditionInput
  $filter: ModelFavoriteFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listFavorites(
    userId: $userId
    noteId: $noteId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      userId
      noteId
      createdAt
      note {
        id
        title
        markdown
        html
        authorId
        favoriteCount
        type
        updatedAt
        createdAt
        __typename
      }
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListFavoritesQueryVariables,
  APITypes.ListFavoritesQuery
>;
export const favoritesByDate = /* GraphQL */ `query FavoritesByDate(
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
        html
        authorId
        favoriteCount
        type
        updatedAt
        createdAt
        __typename
      }
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.FavoritesByDateQueryVariables,
  APITypes.FavoritesByDateQuery
>;
export const favoritesByNoteId = /* GraphQL */ `query FavoritesByNoteId(
  $noteId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelFavoriteFilterInput
  $limit: Int
  $nextToken: String
) {
  favoritesByNoteId(
    noteId: $noteId
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
        html
        authorId
        favoriteCount
        type
        updatedAt
        createdAt
        __typename
      }
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.FavoritesByNoteIdQueryVariables,
  APITypes.FavoritesByNoteIdQuery
>;
