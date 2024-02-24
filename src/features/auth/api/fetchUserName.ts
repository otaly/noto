import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useQuery } from 'react-query';

const QUERY_KEY = ['user-attributes'];

type QueryFnType = typeof fetchUserAttributes;

type UseUserNameOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useUserName = ({ config }: UseUserNameOptions = {}) => {
  const { data, ...rest } = useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: QUERY_KEY,
    queryFn: fetchUserAttributes,
  });
  return { name: data?.name, ...rest };
};
