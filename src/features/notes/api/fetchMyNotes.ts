import { ListNotesByAuthorQuery, ModelSortDirection } from '@/API';
import { listNotesByAuthor } from '@/graphql/custom-queries';
import {
  ExtractFnReturnType,
  QueryConfig,
  UseSubscriptionsConfig,
} from '@/lib/react-query';
import { nonNullableFilter } from '@/utils/filter';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { generateClient } from 'aws-amplify/api';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
  subscribeOnCreateNote,
  subscribeOnDeleteNote,
  subscribeOnUpdateNote,
} from './subscriptions';

const client = generateClient();

const fetchMyNotes = async ({ username }: { username: string }) => {
  const { data } = (await client.graphql({
    query: listNotesByAuthor,
    variables: {
      authorId: username,
      sortDirection: ModelSortDirection.DESC,
    },
  })) as GraphQLResult<ListNotesByAuthorQuery>;
  return data?.notesByAuthorAndDate?.items.filter(nonNullableFilter);
};

type QueryFnType = typeof fetchMyNotes;

type UseMyNotesOptions = {
  username: string;
  config?: QueryConfig<QueryFnType>;
};

const getQueryKey = (username: string) => ['my-notes', username];

export const useMyNotes = ({ username, config }: UseMyNotesOptions) =>
  useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: getQueryKey(username),
    queryFn: () => fetchMyNotes({ username }),
  });

type UseMyNotesSubscriptionsOptions = {
  username: string;
  config?: UseSubscriptionsConfig;
};

/**
 * create, update, deleteのsubscription。
 */
export const useMyNotesSubscriptions = ({
  username,
  config,
}: UseMyNotesSubscriptionsOptions) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    if (config?.enabled === false) {
      return;
    }

    const queryKey = getQueryKey(username);
    const subscriptions: ({ unsubscribe: () => void } | undefined)[] = [];

    const createSubscription = subscribeOnCreateNote({
      next: (note) => {
        if (!note || note.authorId !== username) {
          return;
        }
        queryClient.setQueriesData(
          queryKey,
          (prev: ExtractFnReturnType<QueryFnType>) => {
            if (!prev) {
              return [note];
            }
            return [note, ...prev];
          },
        );
      },
    });
    subscriptions.push(createSubscription);

    const updateSubscription = subscribeOnUpdateNote({
      next: (note) => {
        if (!note || note.authorId !== username) {
          return;
        }
        queryClient.setQueriesData(
          queryKey,
          (prev: ExtractFnReturnType<QueryFnType>) => {
            if (!prev) {
              return [];
            }
            return prev.map((n) => (n.id === note.id ? note : n));
          },
        );
      },
    });
    subscriptions.push(updateSubscription);

    const deleteSubscription = subscribeOnDeleteNote({
      next: (note) => {
        if (!note || note.authorId !== username) {
          return;
        }
        queryClient.setQueriesData(
          queryKey,
          (prev: ExtractFnReturnType<QueryFnType>) => {
            if (!prev) {
              return [];
            }
            return prev.filter((n) => n.id !== note.id);
          },
        );
      },
    });
    subscriptions.push(deleteSubscription);

    return () => subscriptions.forEach((s) => s?.unsubscribe());
  }, [config?.enabled, queryClient, username]);
};
