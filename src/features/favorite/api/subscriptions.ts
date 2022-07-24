import {
  OnCreateFavoriteIdSubscription,
  OnDeleteFavoriteIdSubscription,
} from '@/API';
import {
  onCreateFavoriteId,
  onDeleteFavoriteId,
} from '@/graphql/custom-subscriptions';
import { SubscriptionResult } from '@/types';
import { API, graphqlOperation } from 'aws-amplify';

export const subscribeOnCreate = (
  username: string,
  {
    next,
    error,
  }: {
    next: (
      favorite: OnCreateFavoriteIdSubscription['onCreateFavorite']
    ) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: (err: any) => void;
  }
) => {
  const observable = API.graphql(
    graphqlOperation(onCreateFavoriteId, { userId: username })
  );
  if ('subscribe' in observable) {
    return observable.subscribe({
      next: (msg: SubscriptionResult<OnCreateFavoriteIdSubscription>) => {
        const favorite = msg.value.data?.onCreateFavorite;
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
      favorite: OnDeleteFavoriteIdSubscription['onDeleteFavorite']
    ) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: (err: any) => void;
  }
) => {
  const observable = API.graphql(
    graphqlOperation(onDeleteFavoriteId, { userId: username })
  );
  if ('subscribe' in observable) {
    return observable.subscribe({
      next: (msg: SubscriptionResult<OnDeleteFavoriteIdSubscription>) => {
        const favorite = msg.value.data?.onDeleteFavorite;
        next(favorite);
      },
      error,
    });
  }
};
