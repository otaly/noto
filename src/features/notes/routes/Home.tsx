import { ContentLayout, Header } from '@/components/Layout';
import { Box, Heading } from '@chakra-ui/react';
import { NoteCardProps } from '../components/NoteCard';
import { NoteCards } from '../components/NoteCards';
import { NoteCardsGrid } from '../components/NoteCardsGrid';
import { NoteCardsLayout } from '../components/NoteCardsLayout';

const notes: NoteCardProps[] = Array(8)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title: '今日の料理の計画について',
    text: 'あ'.repeat(120 + i),
    favoriteCount: 12 + i,
    isFavorite: true,
  }));

export const Home = () => (
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
