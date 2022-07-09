import { ListFavoritesByUserIdQuery, ModelSortDirection } from '@/API';
import { ContentLayout, Header } from '@/components/Layout';
import { listFavoritesByUserId } from '@/graphql/custom-queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Box } from '@chakra-ui/react';
import { API, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { NoteCardProps } from '../components/NoteCard';
import { NoteCards } from '../components/NoteCards';
import { NoteCardsLayout } from '../components/NoteCardsLayout';

export const Favorites = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [notes, setNotes] = useState<NoteCardProps[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const notesData = (await API.graphql(
        graphqlOperation(listFavoritesByUserId, {
          userId: user?.username,
          sortDirection: ModelSortDirection.DESC,
        })
      )) as GraphQLResult<ListFavoritesByUserIdQuery>;
      const notesRaw = notesData.data?.favoritesByDate?.items;
      const formattedNotes = (notesRaw?.filter(Boolean).map((n) => ({
        ...n?.note,
        isMyNote: n?.note?.authorId === user.username,
      })) ?? []) as unknown as NoteCardProps[];
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
