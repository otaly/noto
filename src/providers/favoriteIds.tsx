import { useCurrentUser } from '@/features/auth/api/useCurrentUser';
import {
  useFavoriteIds,
  useFavoriteIdsSubscriptions,
} from '@/features/favorite/api/fetchFavoriteIds';
import { createContext, useContext, useMemo } from 'react';

type FavoriteIdsProviderProps = {
  children: React.ReactNode;
};

const favoriteIdsContext = createContext<string[]>([]);

export const FavoriteIdsProvider = ({ children }: FavoriteIdsProviderProps) => {
  const { isSignedIn, username } = useCurrentUser();

  // TODO: 一旦suspense: falseにしているが、要検討。
  const { data } = useFavoriteIds({
    username,
    config: { enabled: isSignedIn, suspense: false },
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
