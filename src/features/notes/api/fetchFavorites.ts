import { ListFavoritesByUserIdQuery, ModelSortDirection } from '@/API';
import { listFavoritesByUserId } from '@/graphql/custom-queries';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { nonNullableFilter } from '@/utils/filter';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from 'aws-amplify';
import { useQuery } from 'react-query';

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

export const useFavorites = ({ username, config }: UseFavoritesOptions) =>
  useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['favorite-notes'],
    queryFn: () => fetchFavorites({ username }),
  });
