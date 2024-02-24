import {
  OnCreateFavoriteSubscription,
  OnCreateNoteSubscription,
  OnDeleteNoteSubscription,
  OnUpdateNoteSubscription,
} from '@/API';
import {
  onCreateFavorite,
  onCreateNote,
  onDeleteNote,
  onUpdateNote,
} from '@/graphql/subscriptions';
import { generateClient } from 'aws-amplify/api';

const client = generateClient({ authMode: 'iam' });

export const subscribeOnCreateNote = ({
  next,
  error,
}: {
  next: (note: OnCreateNoteSubscription['onCreateNote']) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: (err: any) => void;
}) => {
  const observable = client.graphql({ query: onCreateNote });
  if ('subscribe' in observable) {
    return observable.subscribe({
      next: (msg) => {
        const note = msg.data?.onCreateNote;
        next(note);
      },
      error,
    });
  }
};

export const subscribeOnUpdateNote = ({
  next,
  error,
}: {
  next: (note: OnUpdateNoteSubscription['onUpdateNote']) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: (err: any) => void;
}) => {
  const observable = client.graphql({ query: onUpdateNote });
  if ('subscribe' in observable) {
    return observable.subscribe({
      next: (msg) => {
        const note = msg.data?.onUpdateNote;
        next(note);
      },
      error,
    });
  }
};

export const subscribeOnDeleteNote = ({
  next,
  error,
}: {
  next: (note: OnDeleteNoteSubscription['onDeleteNote']) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: (err: any) => void;
}) => {
  const observable = client.graphql({ query: onDeleteNote });
  if ('subscribe' in observable) {
    return observable.subscribe({
      next: (msg) => {
        const note = msg.data?.onDeleteNote;
        next(note);
      },
      error,
    });
  }
};

export const subscribeOnCreateFavorite = (
  username: string,
  {
    next,
    error,
  }: {
    next: (favorite: OnCreateFavoriteSubscription['onCreateFavorite']) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: (err: any) => void;
  },
) => {
  const observable = client.graphql({
    query: onCreateFavorite,
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
