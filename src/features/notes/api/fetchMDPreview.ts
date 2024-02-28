import { PreviewMDMutation } from '@/API';
import { previewMD } from '@/graphql/mutations';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { GraphQLResult, generateClient } from 'aws-amplify/api';
import { useQuery } from 'react-query';

const client = generateClient();

const fetchMDPreview = async ({ markdown }: { markdown: string }) => {
  const { data } = (await client.graphql({
    query: previewMD,
    variables: { markdown },
  })) as GraphQLResult<PreviewMDMutation>;
  return data;
};

type QueryFnType = typeof fetchMDPreview;

type UseMDPreviewOptions = {
  noteId: string;
  markdown: string;
  config?: QueryConfig<QueryFnType>;
};

const getQueryKey = (noteId: string) => ['markdown-preview', noteId];

export const useMDPreview = ({
  noteId,
  markdown,
  config,
}: UseMDPreviewOptions) =>
  useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: getQueryKey(noteId),
    queryFn: () => fetchMDPreview({ markdown }),
  });
