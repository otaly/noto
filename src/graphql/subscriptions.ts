/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote {
    onCreateNote {
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
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote {
    onUpdateNote {
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
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote {
    onDeleteNote {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($id: String) {
    onCreateUser(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($id: String) {
    onUpdateUser(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($id: String) {
    onDeleteUser(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFavorite = /* GraphQL */ `
  subscription OnCreateFavorite($userId: String) {
    onCreateFavorite(userId: $userId) {
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
export const onDeleteFavorite = /* GraphQL */ `
  subscription OnDeleteFavorite($userId: String) {
    onDeleteFavorite(userId: $userId) {
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
