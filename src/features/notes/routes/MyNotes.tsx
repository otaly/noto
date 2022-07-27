import { ContentLayout, Header } from '@/components/Layout';
import { AuthStatus } from '@/constants';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Box } from '@chakra-ui/react';
import { useMyNotes, useMyNotesSubscriptions } from '../api/fetchMyNotes';
import { NoteCardProps } from '../components/NoteCard';
import { NoteCards } from '../components/NoteCards';
import { NoteCardsLayout } from '../components/NoteCardsLayout';
import { UnauthDisplay } from '../components/UnauthDisplay';

export const MyNotes = () => {
  const { user, authStatus } = useAuthenticator((context) => [
    context.user,
    context.authStatus,
  ]);
  const isSignedIn = authStatus === AuthStatus.AUTHENTICATED;
  const username = user?.username ?? '';

  const { data, isLoading, status } = useMyNotes({
    username,
    config: { enabled: isSignedIn },
  });
  useMyNotesSubscriptions({ username, config: { enabled: isSignedIn } });

  const notes: NoteCardProps[] =
    data?.map((note) => ({
      ...note,
      isMyNote: true,
      favoriteCount: note.favoriteCount ?? undefined,
    })) ?? [];

  return (
    <ContentLayout header={<Header />}>
      {isSignedIn ? (
        <NoteCardsLayout>
          <Box py={4}>
            <NoteCards notes={notes} />
          </Box>
        </NoteCardsLayout>
      ) : (
        <UnauthDisplay message="ログインすると自分のノートが表示されます" />
      )}
    </ContentLayout>
  );
};
