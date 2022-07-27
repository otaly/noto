import { ContentLayout, Header } from '@/components/Layout';
import { AuthStatus } from '@/constants';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Box, Heading } from '@chakra-ui/react';
import { useHomeNotes, useHomeNotesSubscriptions } from '../api/fetchHomeNotes';
import { NoteCardProps } from '../components/NoteCard';
import { NoteCards } from '../components/NoteCards';
import { NoteCardsGrid } from '../components/NoteCardsGrid';
import { NoteCardsLayout } from '../components/NoteCardsLayout';

export const Home = () => {
  const { authStatus, user } = useAuthenticator((context) => [
    context.authStatus,
    context.user,
  ]);

  const { data, isLoading, status } = useHomeNotes();
  // TODO: 未ログインでのsubscription
  const isSignedIn = authStatus === AuthStatus.AUTHENTICATED;
  useHomeNotesSubscriptions({ config: { enabled: isSignedIn } });
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
          <NoteCards notes={notes} />
        </Box>
      </NoteCardsLayout>
    </ContentLayout>
  );
};
