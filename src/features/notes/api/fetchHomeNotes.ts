import { ListNotesQuery, ModelSortDirection } from '@/API';
import { listNotes } from '@/graphql/custom-queries';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { nonNullableFilter } from '@/utils/filter';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from 'aws-amplify';
import { useQuery } from 'react-query';

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
    queryKey: ['home-notes'],
    queryFn: fetchHomeNotes,
  });
