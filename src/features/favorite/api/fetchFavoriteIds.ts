import { ListFavoriteIdsQuery } from '@/API';
import { listFavoriteIds } from '@/graphql/custom-queries';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { nonNullableFilter } from '@/utils/filter';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from 'aws-amplify';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { subscribeOnCreate, subscribeOnDelete } from './subscriptions';

const fetchFavoriteIds = async ({ username }: { username: string }) => {
  const { data } = (await API.graphql(
    graphqlOperation(listFavoriteIds, {
      userId: username,
    })
  )) as GraphQLResult<ListFavoriteIdsQuery>;
  return data?.listFavorites?.items
    .filter(nonNullableFilter)
    .map(({ noteId }) => noteId);
};

type QueryFnType = typeof fetchFavoriteIds;

type UseFavoriteIdsOptions = {
  username: string;
  config?: QueryConfig<QueryFnType>;
};

const getQueryKey = (username: string) => ['favorite-ids', username];

export const useFavoriteIds = ({ username, config }: UseFavoriteIdsOptions) =>
  useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: getQueryKey(username),
    queryFn: () => fetchFavoriteIds({ username }),
  });

type UseFavoriteIdsSubscriptionsOptions = {
  username: string;
  config?: { enabled: boolean };
};

/**
 * create, deleteのsubscription。
 */
export const useFavoriteIdsSubscriptions = ({
  username,
  config,
}: UseFavoriteIdsSubscriptionsOptions) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    if (config?.enabled === false) {
      return;
    }

    const queryKey = getQueryKey(username);
    const subscriptions: ({ unsubscribe: () => void } | undefined)[] = [];

    const createSubscription = subscribeOnCreate(username, {
      next: (favorite) => {
        if (!favorite) {
          return;
        }
        queryClient.setQueriesData(
          queryKey,
          (prev: ExtractFnReturnType<QueryFnType>) => {
            if (!prev) {
              return [favorite.noteId];
            }
            return [favorite.noteId, ...prev];
          }
        );
      },
    });
    subscriptions.push(createSubscription);

    const deleteSubscription = subscribeOnDelete(username, {
      next: (favorite) => {
        if (!favorite) {
          return;
        }
        queryClient.setQueriesData(
          queryKey,
          (prev: ExtractFnReturnType<QueryFnType>) => {
            if (!prev) {
              return [];
            }
            return prev.filter((id) => id !== favorite.noteId);
          }
        );
      },
    });
    subscriptions.push(deleteSubscription);

    return () => subscriptions.forEach((s) => s?.unsubscribe());
  }, [config?.enabled, queryClient, username]);
};
