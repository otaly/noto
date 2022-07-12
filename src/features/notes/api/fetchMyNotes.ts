import { ListNotesByAuthorQuery, ModelSortDirection } from '@/API';
import { listNotesByAuthor } from '@/graphql/custom-queries';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { nonNullableFilter } from '@/utils/filter';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from 'aws-amplify';
import { useQuery } from 'react-query';

const fetchMyNotes = async ({ username }: { username: string }) => {
  const { data } = (await API.graphql(
    graphqlOperation(listNotesByAuthor, {
      authorId: username,
      sortDirection: ModelSortDirection.DESC,
    })
  )) as GraphQLResult<ListNotesByAuthorQuery>;
  return data?.notesByAuthorAndDate?.items.filter(nonNullableFilter);
};

type QueryFnType = typeof fetchMyNotes;

type UseMyNotesOptions = {
  username: string;
  config?: QueryConfig<QueryFnType>;
};

export const useMyNotes = ({ username, config }: UseMyNotesOptions) =>
  useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['my-notes'],
    queryFn: () => fetchMyNotes({ username }),
  });
