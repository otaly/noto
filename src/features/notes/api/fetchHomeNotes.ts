import { ListNotesQuery, ModelSortDirection } from '@/API';
import { listNotes } from '@/graphql/custom-queries';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { nonNullableFilter } from '@/utils/filter';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from 'aws-amplify';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
  subscribeOnCreateNote,
  subscribeOnDeleteNote,
  subscribeOnUpdateNote,
} from './subscriptions';

const QUERY_KEY = ['home-notes'];

const fetchHomeNotes = async () => {
  const { data } = (await API.graphql(
    graphqlOperation(listNotes, {
      sortDirection: ModelSortDirection.DESC,
    })
  )) as GraphQLResult<ListNotesQuery>;
  return data?.notesByDate?.items.filter(nonNullableFilter);
};

type QueryFnType = typeof fetchHomeNotes;

type UseHomeNotesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useHomeNotes = ({ config }: UseHomeNotesOptions = {}) =>
  useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: QUERY_KEY,
    queryFn: fetchHomeNotes,
  });

/**
 * create, update, deleteのsubscription。
 */
export const useHomeNotesSubscriptions = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const subscriptions: ({ unsubscribe: () => void } | undefined)[] = [];

    const createSubscription = subscribeOnCreateNote({
      next: (note) => {
        if (!note) {
          return;
        }
        queryClient.setQueriesData(
          QUERY_KEY,
          (prev: ExtractFnReturnType<QueryFnType>) => {
            if (!prev) {
              return [note];
            }
            return [note, ...prev];
          }
        );
      },
    });
    subscriptions.push(createSubscription);

    const updateSubscription = subscribeOnUpdateNote({
      next: (note) => {
        if (!note) {
          return;
        }
        queryClient.setQueriesData(
          QUERY_KEY,
          (prev: ExtractFnReturnType<QueryFnType>) => {
            if (!prev) {
              return [];
            }
            return prev.map((n) => (n.id === note.id ? note : n));
          }
        );
      },
    });
    subscriptions.push(updateSubscription);

    const deleteSubscription = subscribeOnDeleteNote({
      next: (note) => {
        if (!note) {
          return;
        }
        queryClient.setQueriesData(
          QUERY_KEY,
          (prev: ExtractFnReturnType<QueryFnType>) => {
            if (!prev) {
              return [];
            }
            return prev.filter((n) => n.id !== note.id);
          }
        );
      },
    });
    subscriptions.push(deleteSubscription);

    return () => subscriptions.forEach((s) => s?.unsubscribe());
  }, [queryClient]);
};
