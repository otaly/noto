import { ContentLayout, Header } from '@/components/Layout';
import { AuthStatus } from '@/constants';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Box } from '@chakra-ui/react';
import { useFavorites, useFavoritesSubscriptions } from '../api/fetchFavorites';
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

  return (
    <ContentLayout header={<Header />}>
      <NoteCardsLayout>
        <Box py={4}>
          <NoteCards notes={notes} />
        </Box>
      </NoteCardsLayout>
    </ContentLayout>
  );
};
