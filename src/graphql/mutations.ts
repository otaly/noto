/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const previewMD = /* GraphQL */ `
  mutation PreviewMD($markdown: String!) {
    previewMD(markdown: $markdown)
  }
`;
export const createUser = /* GraphQL */ `
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const createNote = /* GraphQL */ `
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
export const updateNote = /* GraphQL */ `
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
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
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
      }
      favoriteCount
      type
      updatedAt
      createdAt
    }
  }
`;
export const createFavorite = /* GraphQL */ `
  mutation CreateFavorite(
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
        }
        favoriteCount
        type
        updatedAt
        createdAt
      }
    }
  }
`;
export const deleteFavorite = /* GraphQL */ `
  mutation DeleteFavorite(
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
        }
        favoriteCount
        type
        updatedAt
        createdAt
      }
    }
  }
`;
export const changeFavorite = /* GraphQL */ `
  mutation ChangeFavorite($input: ChangeFavoriteInput!) {
    changeFavorite(input: $input) {
      noteId
      isFavorite
    }
  }
`;
export const createNoteForClient = /* GraphQL */ `
  mutation CreateNoteForClient($input: CreateNoteForClientInput!) {
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
      }
      favoriteCount
      type
      updatedAt
      createdAt
    }
  }
`;
export const updateNoteForClient = /* GraphQL */ `
  mutation UpdateNoteForClient($input: UpdateNoteForClientInput!) {
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
      }
      favoriteCount
      type
      updatedAt
      createdAt
    }
  }
`;
