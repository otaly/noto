import {
  OnCreateFavoriteIdSubscription,
  OnDeleteFavoriteIdSubscription,
} from '@/API';
import {
  onCreateFavoriteId,
  onDeleteFavoriteId,
} from '@/graphql/custom-subscriptions';
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

export const subscribeOnCreate = (
  username: string,
  {
    next,
    error,
  }: {
    next: (
      favorite: OnCreateFavoriteIdSubscription['onCreateFavorite'],
    ) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: (err: any) => void;
  },
) => {
  const observable = client.graphql({
    query: onCreateFavoriteId,
    variables: { userId: username },
  });
  if ('subscribe' in observable) {
    return observable.subscribe({
      next: (msg) => {
        const favorite = msg.data?.onCreateFavorite;
        next(favorite);
      },
      error,
    });
  }
};

export const subscribeOnDelete = (
  username: string,
  {
    next,
    error,
  }: {
    next: (
      favorite: OnDeleteFavoriteIdSubscription['onDeleteFavorite'],
    ) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: (err: any) => void;
  },
) => {
  const observable = client.graphql({
    query: onDeleteFavoriteId,
    variables: { userId: username },
  });
  if ('subscribe' in observable) {
    return observable.subscribe({
      next: (msg) => {
        const favorite = msg.data?.onDeleteFavorite;
        next(favorite);
      },
      error,
    });
  }
};
