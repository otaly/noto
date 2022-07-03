import {
  ListFavoriteIdsQuery,
  OnCreateFavoriteIdSubscription,
  OnDeleteFavoriteIdSubscription,
} from '@/API';
import { AuthStatus } from '@/constants';
import { listFavoriteIds } from '@/graphql/custom-queries';
import {
  onCreateFavoriteId,
  onDeleteFavoriteId,
} from '@/graphql/custom-subscriptions';
import { SubscriptionResult } from '@/types';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { API, graphqlOperation } from 'aws-amplify';
import {
  createContext,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from 'react';

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
  const [favoriteIds, dispatch] = useReducer(reducer, []);
  const { authStatus, user } = useAuthenticator((context) => [
    context.authStatus,
    context.user,
  ]);

  useEffect(() => {
    if (authStatus !== AuthStatus.AUTHENTICATED) {
      return;
    }
    const fetchFavoriteIds = async () => {
      const listFavoriteIdsResult = (await API.graphql(
        graphqlOperation(listFavoriteIds, {
          userId: user?.username,
        })
      )) as GraphQLResult<ListFavoriteIdsQuery>;
      const ids =
        listFavoriteIdsResult.data?.listFavorites?.items
          .filter((v): v is NonNullable<typeof v> => Boolean(v))
          .map(({ noteId }) => noteId) ?? [];
      dispatch({ type: INITIAL_QUERY, ids });
    };
    fetchFavoriteIds();

    const subscriptions: { unsubscribe: () => void }[] = [];
    const createObservable = API.graphql(
      graphqlOperation(onCreateFavoriteId, {
        userId: user?.username,
      })
    );
    if ('subscribe' in createObservable) {
      subscriptions.push(
        createObservable.subscribe({
          next: (msg: SubscriptionResult<OnCreateFavoriteIdSubscription>) => {
            const favoriteId = msg.value.data?.onCreateFavorite?.noteId;
            if (favoriteId == null) {
              return;
            }
            dispatch({ type: CREATE, ids: [favoriteId] });
          },
        })
      );
    }
    const deleteObservable = API.graphql(
      graphqlOperation(onDeleteFavoriteId, {
        userId: user?.username,
      })
    );
    if ('subscribe' in deleteObservable) {
      subscriptions.push(
        deleteObservable.subscribe({
          next: (msg: SubscriptionResult<OnDeleteFavoriteIdSubscription>) => {
            const favoriteId = msg.value.data?.onDeleteFavorite?.noteId;
            if (favoriteId == null) {
              return;
            }
            dispatch({ type: DELETE, ids: [favoriteId] });
          },
        })
      );
    }

    return () => subscriptions.forEach((s) => s.unsubscribe());
  }, [authStatus, user?.username]);

  return (
    <favoriteIdsContext.Provider value={favoriteIds}>
      {children}
    </favoriteIdsContext.Provider>
  );
};

export const useFavoriteIds = () => useContext(favoriteIdsContext);
