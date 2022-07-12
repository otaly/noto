import { ContentLayout, Header } from '@/components/Layout';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Box } from '@chakra-ui/react';
import { useFavorites } from '../api/fetchFavorites';
import { NoteCardProps } from '../components/NoteCard';
import { NoteCards } from '../components/NoteCards';
import { NoteCardsLayout } from '../components/NoteCardsLayout';

export const Favorites = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  const { data, isLoading, status } = useFavorites({
    username: user?.username ?? '',
    config: { enabled: user?.username != null },
  });
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
