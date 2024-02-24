import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem } from "@aws-amplify/datastore";

type EagerChangeFavorite = {
  readonly noteId: string;
  readonly isFavorite: boolean;
}

type LazyChangeFavorite = {
  readonly noteId: string;
  readonly isFavorite: boolean;
}

export declare type ChangeFavorite = LazyLoading extends LazyLoadingDisabled ? EagerChangeFavorite : LazyChangeFavorite

export declare const ChangeFavorite: (new (init: ModelInit<ChangeFavorite>) => ChangeFavorite)

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type NoteMetaData = {
  readOnlyFields: 'createdAt';
}

type FavoriteMetaData = {
  readOnlyFields: 'updatedAt';
}

type EagerUser = {
  readonly id: string;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

type EagerNote = {
  readonly id: string;
  readonly title: string;
  readonly markdown: string;
  readonly html: string;
  readonly authorId?: string | null;
  readonly author?: User | null;
  readonly favoriteCount?: number | null;
  readonly type: string;
  readonly updatedAt: string;
  readonly createdAt?: string | null;
}

type LazyNote = {
  readonly id: string;
  readonly title: string;
  readonly markdown: string;
  readonly html: string;
  readonly authorId?: string | null;
  readonly author: AsyncItem<User | undefined>;
  readonly favoriteCount?: number | null;
  readonly type: string;
  readonly updatedAt: string;
  readonly createdAt?: string | null;
}

export declare type Note = LazyLoading extends LazyLoadingDisabled ? EagerNote : LazyNote

export declare const Note: (new (init: ModelInit<Note, NoteMetaData>) => Note) & {
  copyOf(source: Note, mutator: (draft: MutableModel<Note, NoteMetaData>) => MutableModel<Note, NoteMetaData> | void): Note;
}

type EagerFavorite = {
  readonly id: string;
  readonly userId: string;
  readonly noteId: string;
  readonly createdAt: string;
  readonly note?: Note | null;
  readonly updatedAt?: string | null;
}

type LazyFavorite = {
  readonly id: string;
  readonly userId: string;
  readonly noteId: string;
  readonly createdAt: string;
  readonly note: AsyncItem<Note | undefined>;
  readonly updatedAt?: string | null;
}

export declare type Favorite = LazyLoading extends LazyLoadingDisabled ? EagerFavorite : LazyFavorite

export declare const Favorite: (new (init: ModelInit<Favorite, FavoriteMetaData>) => Favorite) & {
  copyOf(source: Favorite, mutator: (draft: MutableModel<Favorite, FavoriteMetaData>) => MutableModel<Favorite, FavoriteMetaData> | void): Favorite;
}