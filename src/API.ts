/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type DeleteNoteInput = {
  id: string,
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

export type Note = {
  __typename: "Note",
  id: string,
  title: string,
  content: string,
  authorId: string,
  favoriteCount?: number | null,
  type: string,
  updatedAt: string,
  createdAt: string,
};

export type CreateNoteInput = {
  id?: string | null,
  title: string,
  content: string,
  authorId: string,
  favoriteCount?: number | null,
  type: string,
  updatedAt?: string | null,
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


export type Favorite = {
  __typename: "Favorite",
  userId: string,
  createdAt: string,
  noteId: string,
  note?: Note | null,
};

export type ModelFavoriteFilterInput = {
  userId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  noteId?: ModelIDInput | null,
  and?: Array< ModelFavoriteFilterInput | null > | null,
  or?: Array< ModelFavoriteFilterInput | null > | null,
  not?: ModelFavoriteFilterInput | null,
};

export type ModelFavoriteConnection = {
  __typename: "ModelFavoriteConnection",
  items:  Array<Favorite | null >,
  nextToken?: string | null,
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
    authorId: string,
    favoriteCount?: number | null,
    type: string,
    updatedAt: string,
    createdAt: string,
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
    authorId: string,
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
    authorId: string,
    favoriteCount?: number | null,
    type: string,
    updatedAt: string,
    createdAt: string,
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
    authorId: string,
    favoriteCount?: number | null,
    type: string,
    updatedAt: string,
    createdAt: string,
  } | null,
};

export type ListNotesQueryVariables = {
  filter?: ModelNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotesQuery = {
  listNotes?:  {
    __typename: "ModelNoteConnection",
    items:  Array< {
      __typename: "Note",
      id: string,
      title: string,
      content: string,
      authorId: string,
      favoriteCount?: number | null,
      type: string,
      updatedAt: string,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
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
      authorId: string,
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
      authorId: string,
      favoriteCount?: number | null,
      type: string,
      updatedAt: string,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetFavoriteQueryVariables = {
  userId: string,
  createdAt: string,
};

export type GetFavoriteQuery = {
  getFavorite?:  {
    __typename: "Favorite",
    userId: string,
    createdAt: string,
    noteId: string,
    note?:  {
      __typename: "Note",
      id: string,
      title: string,
      content: string,
      authorId: string,
      favoriteCount?: number | null,
      type: string,
      updatedAt: string,
      createdAt: string,
    } | null,
  } | null,
};

export type ListFavoritesQueryVariables = {
  userId?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
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
      createdAt: string,
      noteId: string,
      note?:  {
        __typename: "Note",
        id: string,
        title: string,
        content: string,
        authorId: string,
        favoriteCount?: number | null,
        type: string,
        updatedAt: string,
        createdAt: string,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};
