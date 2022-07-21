import {
  OnCreateNoteSubscription,
  OnDeleteNoteSubscription,
  OnUpdateNoteSubscription,
} from '@/API';
import {
  onCreateNote,
  onDeleteNote,
  onUpdateNote,
} from '@/graphql/subscriptions';
import { SubscriptionResult } from '@/types';
import { API, graphqlOperation } from 'aws-amplify';

export const subscribeOnCreateNote = ({
  next,
  error,
}: {
  next: (note: OnCreateNoteSubscription['onCreateNote']) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: (err: any) => void;
}) => {
  const observable = API.graphql(graphqlOperation(onCreateNote));
  if ('subscribe' in observable) {
    return observable.subscribe({
      next: (msg: SubscriptionResult<OnCreateNoteSubscription>) => {
        const note = msg.value.data?.onCreateNote;
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
  const observable = API.graphql(graphqlOperation(onUpdateNote));
  if ('subscribe' in observable) {
    return observable.subscribe({
      next: (msg: SubscriptionResult<OnUpdateNoteSubscription>) => {
        const note = msg.value.data?.onUpdateNote;
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
  const observable = API.graphql(graphqlOperation(onDeleteNote));
  if ('subscribe' in observable) {
    return observable.subscribe({
      next: (msg: SubscriptionResult<OnDeleteNoteSubscription>) => {
        const note = msg.value.data?.onDeleteNote;
        next(note);
      },
      error,
    });
  }
};
