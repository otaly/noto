import { GetNoteQuery } from '@/API';
import { getNote } from '@/graphql/queries';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from 'aws-amplify';
import { useQuery } from 'react-query';

const fetchNote = async ({ id }: { id: string }) => {
  const { data } = (await API.graphql(
    graphqlOperation(getNote, { id })
  )) as GraphQLResult<GetNoteQuery>;
  return data?.getNote;
};

type QueryFnType = typeof fetchNote;

type UseNoteOptions = {
  id: string;
  config?: QueryConfig<QueryFnType>;
};

export const useNote = ({ id, config }: UseNoteOptions) =>
  useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['note'],
    queryFn: () => fetchNote({ id }),
  });
