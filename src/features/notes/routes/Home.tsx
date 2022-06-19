import { ModelSortDirection, NotesByDateQuery } from '@/API';
import { ContentLayout, Header } from '@/components/Layout';
import { AuthStatus } from '@/constants';
import { notesByDate } from '@/graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Box, Heading } from '@chakra-ui/react';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { NoteCardProps } from '../components/NoteCard';
import { NoteCards } from '../components/NoteCards';
import { NoteCardsGrid } from '../components/NoteCardsGrid';
import { NoteCardsLayout } from '../components/NoteCardsLayout';

export const Home = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const [notes, setNotes] = useState<NoteCardProps[]>([]);
  useEffect(() => {
    // 一旦雑に
    if (authStatus !== AuthStatus.AUTHENTICATED) {
      Amplify.configure({ aws_appsync_authenticationType: 'AWS_IAM' });
    }
    const fetchNotes = async () => {
      const notesData = (await API.graphql(
        graphqlOperation(notesByDate, {
          type: 'note',
          sortDirection: ModelSortDirection.DESC,
        })
      )) as GraphQLResult<NotesByDateQuery>;
      const notesRaw = notesData.data?.notesByDate?.items;
      const formattedNotes = (notesRaw
        ?.filter(Boolean)
        .map((n) => ({ ...n })) ?? []) as unknown as NoteCardProps[];
      setNotes(formattedNotes);
    };
    fetchNotes();
  }, []);

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
