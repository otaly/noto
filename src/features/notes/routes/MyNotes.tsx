import { ModelSortDirection, NotesByAuthorAndDateQuery } from '@/API';
import { ContentLayout, Header } from '@/components/Layout';
import { notesByAuthorAndDate } from '@/graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Box } from '@chakra-ui/react';
import { API, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { NoteCardProps } from '../components/NoteCard';
import { NoteCards } from '../components/NoteCards';
import { NoteCardsLayout } from '../components/NoteCardsLayout';

export const MyNotes = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [notes, setNotes] = useState<NoteCardProps[]>([]);
  useEffect(() => {
    const fetchNotes = async () => {
      const notesData = (await API.graphql(
        graphqlOperation(notesByAuthorAndDate, {
          authorId: user?.username,
          sortDirection: ModelSortDirection.DESC,
        })
      )) as GraphQLResult<NotesByAuthorAndDateQuery>;
      const notesRaw = notesData.data?.notesByAuthorAndDate?.items;
      const formattedNotes = (notesRaw
        ?.filter(Boolean)
        .map((n) => ({ ...n })) ?? []) as unknown as NoteCardProps[];
      setNotes(formattedNotes);
    };
    fetchNotes();
  }, [user?.username]);

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
