import { GetNoteQuery } from '@/API';
import { getNote } from '@/graphql/queries';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { generateClient } from 'aws-amplify/api';
import { useQuery } from 'react-query';

const client = generateClient({ authMode: 'iam' });

const fetchNote = async ({ id }: { id: string }) => {
  const { data } = (await client.graphql({
    query: getNote,
    variables: { id },
  })) as GraphQLResult<GetNoteQuery>;
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
    queryKey: ['note', id],
    queryFn: () => fetchNote({ id }),
  });
