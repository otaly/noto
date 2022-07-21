import { ContentLayout, Header } from '@/components/Layout';
import { AuthStatus } from '@/constants';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Box, Heading } from '@chakra-ui/react';
import { Amplify } from 'aws-amplify';
import { useEffect } from 'react';
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
  useEffect(() => {
    // 一旦雑に
    if (authStatus !== AuthStatus.AUTHENTICATED) {
      Amplify.configure({ aws_appsync_authenticationType: 'AWS_IAM' });
    }
  }, [authStatus]);

  const { data, isLoading, status } = useHomeNotes();
  useHomeNotesSubscriptions();
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
