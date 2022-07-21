import { ContentLayout, Header } from '@/components/Layout';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Box } from '@chakra-ui/react';
import { useMyNotes, useMyNotesSubscriptions } from '../api/fetchMyNotes';
import { NoteCardProps } from '../components/NoteCard';
import { NoteCards } from '../components/NoteCards';
import { NoteCardsLayout } from '../components/NoteCardsLayout';

export const MyNotes = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  const username = user?.username ?? '';
  const { data, isLoading, status } = useMyNotes({
    username,
    config: { enabled: user?.username != null },
  });
  useMyNotesSubscriptions({ username });
  const notes: NoteCardProps[] =
    data?.map((note) => ({
      ...note,
      isMyNote: true,
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
