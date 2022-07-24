import {
  useFavoriteIds,
  useFavoriteIdsSubscriptions,
} from '@/features/favorite/api/fetchFavoriteIds';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { createContext, Reducer, useContext, useMemo } from 'react';

type FavoriteIdsProviderProps = {
  children: React.ReactNode;
};

const INITIAL_QUERY = 'INITIAL_QUERY';
const CREATE = 'CREATE';
const DELETE = 'DELETE';

const reducer: Reducer<string[], { type: string; ids: string[] }> = (
  state,
  action
) => {
  switch (action.type) {
    case INITIAL_QUERY:
      return action.ids;
    case CREATE:
      return [...state, ...action.ids];
    case DELETE:
      return state.filter((id) => !action.ids.includes(id));
    default:
      return state;
  }
};

const favoriteIdsContext = createContext<string[]>([]);

export const FavoriteIdsProvider = ({ children }: FavoriteIdsProviderProps) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const username = user?.username ?? '';
  const { data } = useFavoriteIds({ username });
  useFavoriteIdsSubscriptions({ username });
  const favoriteIds = useMemo(() => data ?? [], [data]);

  return (
    <favoriteIdsContext.Provider value={favoriteIds}>
      {children}
    </favoriteIdsContext.Provider>
  );
};

export const useFavoriteIdsCtx = () => useContext(favoriteIdsContext);
