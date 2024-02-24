/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $id: String
) {
  onCreateUser(filter: $filter, id: $id) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $id: String
) {
  onUpdateUser(filter: $filter, id: $id) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $id: String
) {
  onDeleteUser(filter: $filter, id: $id) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateNote = /* GraphQL */ `subscription OnCreateNote(
  $filter: ModelSubscriptionNoteFilterInput
  $authorId: String
) {
  onCreateNote(filter: $filter, authorId: $authorId) {
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
` as GeneratedSubscription<
  APITypes.OnCreateNoteSubscriptionVariables,
  APITypes.OnCreateNoteSubscription
>;
export const onUpdateNote = /* GraphQL */ `subscription OnUpdateNote(
  $filter: ModelSubscriptionNoteFilterInput
  $authorId: String
) {
  onUpdateNote(filter: $filter, authorId: $authorId) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateNoteSubscriptionVariables,
  APITypes.OnUpdateNoteSubscription
>;
export const onDeleteNote = /* GraphQL */ `subscription OnDeleteNote(
  $filter: ModelSubscriptionNoteFilterInput
  $authorId: String
) {
  onDeleteNote(filter: $filter, authorId: $authorId) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteNoteSubscriptionVariables,
  APITypes.OnDeleteNoteSubscription
>;
export const onCreateFavorite = /* GraphQL */ `subscription OnCreateFavorite(
  $filter: ModelSubscriptionFavoriteFilterInput
  $userId: String
) {
  onCreateFavorite(filter: $filter, userId: $userId) {
    userId
    noteId
    createdAt
    note {
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateFavoriteSubscriptionVariables,
  APITypes.OnCreateFavoriteSubscription
>;
export const onDeleteFavorite = /* GraphQL */ `subscription OnDeleteFavorite(
  $filter: ModelSubscriptionFavoriteFilterInput
  $userId: String
) {
  onDeleteFavorite(filter: $filter, userId: $userId) {
    userId
    noteId
    createdAt
    note {
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteFavoriteSubscriptionVariables,
  APITypes.OnDeleteFavoriteSubscription
>;
