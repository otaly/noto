import { ListFavoritesByUserIdQuery, ModelSortDirection } from '@/API';
import { listFavoritesByUserId } from '@/graphql/custom-queries';
import {
  ExtractFnReturnType,
  QueryConfig,
  UseSubscriptionsConfig,
} from '@/lib/react-query';
import { nonNullableFilter } from '@/utils/filter';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from 'aws-amplify';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
  subscribeOnCreateFavorite,
  subscribeOnDeleteNote,
  subscribeOnUpdateNote,
} from './subscriptions';

const fetchFavorites = async ({ username }: { username: string }) => {
  const { data } = (await API.graphql(
    graphqlOperation(listFavoritesByUserId, {
      userId: username,
      sortDirection: ModelSortDirection.DESC,
    })
  )) as GraphQLResult<ListFavoritesByUserIdQuery>;
  return data?.favoritesByDate?.items
    .map((v) => v?.note)
    .filter(nonNullableFilter);
};

type QueryFnType = typeof fetchFavorites;

type UseFavoritesOptions = {
  username: string;
  config?: QueryConfig<QueryFnType>;
};

const getQueryKey = (username: string) => ['favorite-notes', username];

export const useFavorites = ({ username, config }: UseFavoritesOptions) =>
  useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: getQueryKey(username),
    queryFn: () => fetchFavorites({ username }),
  });

type UseFavoritesSubscriptionsOptions = {
  username: string;
  config?: UseSubscriptionsConfig;
};

/**
 * お気に入りのcreate、ノートのupdate, deleteのsubscription。
 * お気に入り解除時にすぐにノートを非表示にしないために、お気に入りのdelete時は何もしない。
 */
export const useFavoritesSubscriptions = ({
  username,
  config,
}: UseFavoritesSubscriptionsOptions) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    if (config?.enabled === false) {
      return;
    }

    const queryKey = getQueryKey(username);
    const subscriptions: ({ unsubscribe: () => void } | undefined)[] = [];

    const createSubscription = subscribeOnCreateFavorite(username, {
      next: (favorite) => {
        const note = favorite?.note;
        if (!note) {
          return;
        }
        queryClient.setQueriesData(
          queryKey,
          (prev: ExtractFnReturnType<QueryFnType>) => {
            if (!prev) {
              return [note];
            }
            const exists = prev.some(({ id }) => id === note.id);
            if (exists) {
              return prev;
            }
            return [note, ...prev];
          }
        );
      },
    });
    subscriptions.push(createSubscription);

    const updateNoteSubscription = subscribeOnUpdateNote({
      next: (note) => {
        if (!note) {
          return;
        }
        queryClient.setQueriesData(
          queryKey,
          (prev: ExtractFnReturnType<QueryFnType>) => {
            if (!prev) {
              return [];
            }
            return prev.map((n) => (n.id === note.id ? note : n));
          }
        );
      },
    });
    subscriptions.push(updateNoteSubscription);

    const deleteNoteSubscription = subscribeOnDeleteNote({
      next: (note) => {
        if (!note) {
          return;
        }
        queryClient.setQueriesData(
          queryKey,
          (prev: ExtractFnReturnType<QueryFnType>) => {
            if (!prev) {
              return [];
            }
            return prev.filter((n) => n.id !== note.id);
          }
        );
      },
    });
    subscriptions.push(deleteNoteSubscription);

    return () => subscriptions.forEach((s) => s?.unsubscribe());
  }, [config?.enabled, queryClient, username]);
};
