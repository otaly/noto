import { ContentLayout, Header } from '@/components/Layout';
import { AuthStatus } from '@/constants';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Box } from '@chakra-ui/react';
import { useFavorites, useFavoritesSubscriptions } from '../api/fetchFavorites';
import { AltDisplay } from '../components/AltDisplay';
import { NoteCardProps } from '../components/NoteCard';
import { NoteCards } from '../components/NoteCards';
import { NoteCardsLayout } from '../components/NoteCardsLayout';

export const Favorites = () => {
  const { user, authStatus } = useAuthenticator((context) => [
    context.user,
    context.authStatus,
  ]);
  const isSignedIn = authStatus === AuthStatus.AUTHENTICATED;
  const username = user?.username ?? '';

  const { data, isLoading, status } = useFavorites({
    username,
    config: { enabled: isSignedIn },
  });
  useFavoritesSubscriptions({ username, config: { enabled: isSignedIn } });

  const notes: NoteCardProps[] =
    data?.map((note) => ({
      ...note,
      isMyNote: note.authorId === user?.username,
      favoriteCount: note.favoriteCount ?? undefined,
    })) ?? [];

  let altMessage = null;
  if (!isSignedIn) {
    altMessage = 'ログインするとお気に入りしたノートが表示されます';
  } else if (notes.length === 0) {
    altMessage = 'ノートがありません';
  }

  return (
    <ContentLayout header={<Header />}>
      {altMessage ? (
        <AltDisplay message={altMessage} />
      ) : (
        <NoteCardsLayout>
          <Box py={4}>
            <NoteCards notes={notes} />
          </Box>
        </NoteCardsLayout>
      )}
    </ContentLayout>
  );
};
