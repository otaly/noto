/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ModelFavoriteConnection = {
  __typename: "ModelFavoriteConnection",
  items:  Array<Favorite | null >,
  nextToken?: string | null,
};

export type Favorite = {
  __typename: "Favorite",
  userId: string,
  noteId: string,
  createdAt: string,
  note?: Note | null,
};

export type Note = {
  __typename: "Note",
  id: string,
  title: string,
  content: string,
  authorId?: string | null,
  author?: User | null,
  favoriteCount?: number | null,
  type: string,
  updatedAt: string,
  createdAt: string,
};

export type User = {
  __typename: "User",
  id: string,
  name: string,
  createdAt: string,
  updatedAt: string,
};

export type CreateUserInput = {
  id?: string | null,
  name: string,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateNoteInput = {
  id?: string | null,
  title: string,
  content: string,
  authorId?: string | null,
  favoriteCount?: number | null,
  type: string,
  updatedAt?: string | null,
};

export type ModelNoteConditionInput = {
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  authorId?: ModelIDInput | null,
  favoriteCount?: ModelIntInput | null,
  type?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelNoteConditionInput | null > | null,
  or?: Array< ModelNoteConditionInput | null > | null,
  not?: ModelNoteConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateNoteInput = {
  id: string,
  title?: string | null,
  content?: string | null,
  authorId?: string | null,
  favoriteCount?: number | null,
  type?: string | null,
  updatedAt?: string | null,
};

export type DeleteNoteInput = {
  id: string,
};

export type CreateFavoriteInput = {
  userId: string,
  noteId: string,
  createdAt?: string | null,
};

export type ModelFavoriteConditionInput = {
  createdAt?: ModelStringInput | null,
  and?: Array< ModelFavoriteConditionInput | null > | null,
  or?: Array< ModelFavoriteConditionInput | null > | null,
  not?: ModelFavoriteConditionInput | null,
};

export type DeleteFavoriteInput = {
  userId: string,
  noteId: string,
};

export type ChangeFavoriteInput = {
  noteId: string,
  isFavorite: boolean,
};

export type ChangeFavorite = {
  __typename: "ChangeFavorite",
  noteId: string,
  isFavorite: boolean,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelNoteFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  authorId?: ModelIDInput | null,
  favoriteCount?: ModelIntInput | null,
  type?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelNoteFilterInput | null > | null,
  or?: Array< ModelNoteFilterInput | null > | null,
  not?: ModelNoteFilterInput | null,
};

export type ModelNoteConnection = {
  __typename: "ModelNoteConnection",
  items:  Array<Note | null >,
  nextToken?: string | null,
};

export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelFavoriteFilterInput = {
  userId?: ModelIDInput | null,
  noteId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelFavoriteFilterInput | null > | null,
  or?: Array< ModelFavoriteFilterInput | null > | null,
  not?: ModelFavoriteFilterInput | null,
};

export type ListFavoriteIdsQueryVariables = {
  userId?: string | null,
};

export type ListFavoriteIdsQuery = {
  listFavorites?:  {
    __typename: "ModelFavoriteConnection",
    items:  Array< {
      __typename: "Favorite",
      noteId: string,
    } | null >,
  } | null,
};

export type OnCreateFavoriteIdSubscriptionVariables = {
  userId?: string | null,
};

export type OnCreateFavoriteIdSubscription = {
  onCreateFavorite?:  {
    __typename: "Favorite",
    noteId: string,
  } | null,
};

export type OnDeleteFavoriteIdSubscriptionVariables = {
  userId?: string | null,
};

export type OnDeleteFavoriteIdSubscription = {
  onDeleteFavorite?:  {
    __typename: "Favorite",
    noteId: string,
  } | null,
};

export type PreviewMDMutationVariables = {
  markdown: string,
};

export type PreviewMDMutation = {
  previewMD: string,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateNoteMutationVariables = {
  input: CreateNoteInput,
  condition?: ModelNoteConditionInput | null,
};

export type CreateNoteMutation = {
  createNote?:  {
    __typename: "Note",
    id: string,
    title: string,
    content: string,
    authorId?: string | null,
    author?:  {
      __typename: "User",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    favoriteCount?: number | null,
    type: string,
    updatedAt: string,
    createdAt: string,
  } | null,
};

export type UpdateNoteMutationVariables = {
  input: UpdateNoteInput,
  condition?: ModelNoteConditionInput | null,
};

export type UpdateNoteMutation = {
  updateNote?:  {
    __typename: "Note",
    id: string,
    title: string,
    content: string,
    authorId?: string | null,
    author?:  {
      __typename: "User",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    favoriteCount?: number | null,
    type: string,
    updatedAt: string,
    createdAt: string,
  } | null,
};

export type DeleteNoteMutationVariables = {
  input: DeleteNoteInput,
  condition?: ModelNoteConditionInput | null,
};

export type DeleteNoteMutation = {
  deleteNote?:  {
    __typename: "Note",
    id: string,
    title: string,
    content: string,
    authorId?: string | null,
    author?:  {
      __typename: "User",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    favoriteCount?: number | null,
    type: string,
    updatedAt: string,
    createdAt: string,
  } | null,
};

export type CreateFavoriteMutationVariables = {
  input: CreateFavoriteInput,
  condition?: ModelFavoriteConditionInput | null,
};

export type CreateFavoriteMutation = {
  createFavorite?:  {
    __typename: "Favorite",
    userId: string,
    noteId: string,
    createdAt: string,
    note?:  {
      __typename: "Note",
      id: string,
      title: string,
      content: string,
      authorId?: string | null,
      author?:  {
        __typename: "User",
        id: string,
        name: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      favoriteCount?: number | null,
      type: string,
      updatedAt: string,
      createdAt: string,
    } | null,
  } | null,
};

export type DeleteFavoriteMutationVariables = {
  input: DeleteFavoriteInput,
  condition?: ModelFavoriteConditionInput | null,
};

export type DeleteFavoriteMutation = {
  deleteFavorite?:  {
    __typename: "Favorite",
    userId: string,
    noteId: string,
    createdAt: string,
    note?:  {
      __typename: "Note",
      id: string,
      title: string,
      content: string,
      authorId?: string | null,
      author?:  {
        __typename: "User",
        id: string,
        name: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      favoriteCount?: number | null,
      type: string,
      updatedAt: string,
      createdAt: string,
    } | null,
  } | null,
};

export type ChangeFavoriteMutationVariables = {
  input: ChangeFavoriteInput,
};

export type ChangeFavoriteMutation = {
  changeFavorite?:  {
    __typename: "ChangeFavorite",
    noteId: string,
    isFavorite: boolean,
  } | null,
};

export type GetNoteQueryVariables = {
  id: string,
};

export type GetNoteQuery = {
  getNote?:  {
    __typename: "Note",
    id: string,
    title: string,
    content: string,
    authorId?: string | null,
    author?:  {
      __typename: "User",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    favoriteCount?: number | null,
    type: string,
    updatedAt: string,
    createdAt: string,
  } | null,
};

export type NotesByAuthorAndDateQueryVariables = {
  authorId: string,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type NotesByAuthorAndDateQuery = {
  notesByAuthorAndDate?:  {
    __typename: "ModelNoteConnection",
    items:  Array< {
      __typename: "Note",
      id: string,
      title: string,
      content: string,
      authorId?: string | null,
      author?:  {
        __typename: "User",
        id: string,
        name: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      favoriteCount?: number | null,
      type: string,
      updatedAt: string,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type NotesByDateQueryVariables = {
  type: string,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type NotesByDateQuery = {
  notesByDate?:  {
    __typename: "ModelNoteConnection",
    items:  Array< {
      __typename: "Note",
      id: string,
      title: string,
      content: string,
      authorId?: string | null,
      author?:  {
        __typename: "User",
        id: string,
        name: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      favoriteCount?: number | null,
      type: string,
      updatedAt: string,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListFavoritesQueryVariables = {
  userId?: string | null,
  noteId?: ModelIDKeyConditionInput | null,
  filter?: ModelFavoriteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListFavoritesQuery = {
  listFavorites?:  {
    __typename: "ModelFavoriteConnection",
    items:  Array< {
      __typename: "Favorite",
      userId: string,
      noteId: string,
      createdAt: string,
      note?:  {
        __typename: "Note",
        id: string,
        title: string,
        content: string,
        authorId?: string | null,
        favoriteCount?: number | null,
        type: string,
        updatedAt: string,
        createdAt: string,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type FavoritesByDateQueryVariables = {
  userId: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFavoriteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FavoritesByDateQuery = {
  favoritesByDate?:  {
    __typename: "ModelFavoriteConnection",
    items:  Array< {
      __typename: "Favorite",
      userId: string,
      noteId: string,
      createdAt: string,
      note?:  {
        __typename: "Note",
        id: string,
        title: string,
        content: string,
        authorId?: string | null,
        favoriteCount?: number | null,
        type: string,
        updatedAt: string,
        createdAt: string,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  id?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  id?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  id?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateFavoriteSubscriptionVariables = {
  userId?: string | null,
};

export type OnCreateFavoriteSubscription = {
  onCreateFavorite?:  {
    __typename: "Favorite",
    userId: string,
    noteId: string,
    createdAt: string,
    note?:  {
      __typename: "Note",
      id: string,
      title: string,
      content: string,
      authorId?: string | null,
      author?:  {
        __typename: "User",
        id: string,
        name: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      favoriteCount?: number | null,
      type: string,
      updatedAt: string,
      createdAt: string,
    } | null,
  } | null,
};

export type OnDeleteFavoriteSubscriptionVariables = {
  userId?: string | null,
};

export type OnDeleteFavoriteSubscription = {
  onDeleteFavorite?:  {
    __typename: "Favorite",
    userId: string,
    noteId: string,
    createdAt: string,
    note?:  {
      __typename: "Note",
      id: string,
      title: string,
      content: string,
      authorId?: string | null,
      author?:  {
        __typename: "User",
        id: string,
        name: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      favoriteCount?: number | null,
      type: string,
      updatedAt: string,
      createdAt: string,
    } | null,
  } | null,
};
