import { GetNoteQuery } from '@/API';
import { FavoriteButton } from '@/components/Elements/FavoriteButton';
import { ContentLayout, Header } from '@/components/Layout';
import { ALT_TITLE } from '@/constants';
import { getNote } from '@/graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Box, Container } from '@chakra-ui/react';
import { API, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Author } from '../components/Author';
import { HtmlView } from '../components/HtmlView';

export const Note = () => {
  const { id } = useParams();
  const [note, setNote] = useState<GetNoteQuery['getNote']>();

  useEffect(() => {
    if (id == null) {
      return;
    }
    const fetchNote = async () => {
      const { data } = (await API.graphql(
        graphqlOperation(getNote, { id })
      )) as GraphQLResult<GetNoteQuery>;
      setNote(data?.getNote);
    };
    fetchNote();
  }, [id]);

  return (
    <ContentLayout header={<Header />}>
      <Container
        as="article"
        px="min(15%, 12.25rem)"
        py={8}
        maxW="container.xl"
      >
        <Box as="h1" textStyle="h1" mb={4} color="black">
          {note?.title || ALT_TITLE}
        </Box>
        <Box mb={7}>
          <Author
            name={note?.author?.name}
            lastEditDate={note ? new Date(note.updatedAt) : undefined}
          />
        </Box>
        <Box mb={5}>
          <FavoriteButton
            isBigButton
            noteId={id}
            favoriteCount={note?.favoriteCount ?? undefined}
          />
        </Box>
        <Box as="section" mb={6}>
          <HtmlView html={note?.html} />
        </Box>
        <FavoriteButton
          isBigButton
          noteId={id}
          favoriteCount={note?.favoriteCount ?? undefined}
        />
      </Container>
    </ContentLayout>
  );
};
