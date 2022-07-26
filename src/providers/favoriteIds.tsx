import { AuthStatus } from '@/constants';
import {
  useFavoriteIds,
  useFavoriteIdsSubscriptions,
} from '@/features/favorite/api/fetchFavoriteIds';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { createContext, useContext, useMemo } from 'react';

type FavoriteIdsProviderProps = {
  children: React.ReactNode;
};

const favoriteIdsContext = createContext<string[]>([]);

export const FavoriteIdsProvider = ({ children }: FavoriteIdsProviderProps) => {
  const { user, authStatus } = useAuthenticator((context) => [
    context.user,
    context.authStatus,
  ]);
  const isSignedIn = authStatus === AuthStatus.AUTHENTICATED;
  const username = user?.username ?? '';

  const { data } = useFavoriteIds({
    username,
    config: { enabled: isSignedIn },
  });
  useFavoriteIdsSubscriptions({ username, config: { enabled: isSignedIn } });
  const favoriteIds = useMemo(() => data ?? [], [data]);

  return (
    <favoriteIdsContext.Provider value={favoriteIds}>
      {children}
    </favoriteIdsContext.Provider>
  );
};

export const useFavoriteIdsCtx = () => useContext(favoriteIdsContext);
