import { ContentLayout, Header } from '@/components/Layout';
import { useCurrentUser } from '@/features/auth/api/useCurrentUser';
import { Box, Heading } from '@chakra-ui/react';
import { useHomeNotes, useHomeNotesSubscriptions } from '../api/fetchHomeNotes';
import { AltDisplay } from '../components/AltDisplay';
import { NoteCardProps } from '../components/NoteCard';
import { NoteCards } from '../components/NoteCards';
import { NoteCardsGrid } from '../components/NoteCardsGrid';
import { NoteCardsLayout } from '../components/NoteCardsLayout';

export const Home = () => {
  const { username } = useCurrentUser();

  const { data } = useHomeNotes();
  useHomeNotesSubscriptions();
  const notes: NoteCardProps[] =
    data?.map((note) => ({
      ...note,
      isMyNote: note.authorId === username,
      favoriteCount: note.favoriteCount ?? undefined,
    })) ?? [];

  return (
    <ContentLayout header={<Header />}>
      <NoteCardsLayout>
        <Box py={4}>
          <NoteCardsGrid>
            <Heading
              mb={5}
              fontSize="2xl"
              lineHeight="short"
              color="blackAlpha.600"
            >
              <Box as="span" fontSize="1.75rem">
                #
              </Box>
              &nbsp;最新のノート
            </Heading>
          </NoteCardsGrid>
          {notes.length > 0 ? (
            <NoteCards notes={notes} />
          ) : (
            <AltDisplay message="ノートがありません" />
          )}
        </Box>
      </NoteCardsLayout>
    </ContentLayout>
  );
};
