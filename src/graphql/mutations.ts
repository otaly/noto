/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const previewMD = /* GraphQL */ `mutation PreviewMD($markdown: String!) {
  previewMD(markdown: $markdown)
}
` as GeneratedMutation<
  APITypes.PreviewMDMutationVariables,
  APITypes.PreviewMDMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createNote = /* GraphQL */ `mutation CreateNote(
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
      __typename
    }
    favoriteCount
    type
    updatedAt
    createdAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateNoteMutationVariables,
  APITypes.CreateNoteMutation
>;
export const updateNote = /* GraphQL */ `mutation UpdateNote(
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
      __typename
    }
    favoriteCount
    type
    updatedAt
    createdAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateNoteMutationVariables,
  APITypes.UpdateNoteMutation
>;
export const deleteNote = /* GraphQL */ `mutation DeleteNote(
  $input: DeleteNoteInput!
  $condition: ModelNoteConditionInput
) {
  deleteNote(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteNoteMutationVariables,
  APITypes.DeleteNoteMutation
>;
export const createFavorite = /* GraphQL */ `mutation CreateFavorite(
  $input: CreateFavoriteInput!
  $condition: ModelFavoriteConditionInput
) {
  createFavorite(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateFavoriteMutationVariables,
  APITypes.CreateFavoriteMutation
>;
export const deleteFavorite = /* GraphQL */ `mutation DeleteFavorite(
  $input: DeleteFavoriteInput!
  $condition: ModelFavoriteConditionInput
) {
  deleteFavorite(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteFavoriteMutationVariables,
  APITypes.DeleteFavoriteMutation
>;
export const changeFavorite = /* GraphQL */ `mutation ChangeFavorite($input: ChangeFavoriteInput!) {
  changeFavorite(input: $input) {
    noteId
    isFavorite
    __typename
  }
}
` as GeneratedMutation<
  APITypes.ChangeFavoriteMutationVariables,
  APITypes.ChangeFavoriteMutation
>;
export const createNoteForClient = /* GraphQL */ `mutation CreateNoteForClient($input: CreateNoteForClientInput!) {
  createNoteForClient(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateNoteForClientMutationVariables,
  APITypes.CreateNoteForClientMutation
>;
export const updateNoteForClient = /* GraphQL */ `mutation UpdateNoteForClient($input: UpdateNoteForClientInput!) {
  updateNoteForClient(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateNoteForClientMutationVariables,
  APITypes.UpdateNoteForClientMutation
>;
