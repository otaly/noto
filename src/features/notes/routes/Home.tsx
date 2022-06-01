/** @jsxImportSource @emotion/react */
import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import { ContentLayout } from '../../../components/Layout';
import { NoteCards, NoteCardsProps } from '../components/NoteCards';
import { NoteCardLayout } from '../components/NoteCardsLayout';

const notes: NoteCardsProps['notes'] = Array(8)
  .fill(null)
  .map((_, i) => ({
    id: i.toString(),
    title: '今日の料理の計画について',
    text: 'あ'.repeat(120 + i),
    favoriteCount: 12 + i,
    isFavorite: true,
  }));

export const Home = () => (
  <ContentLayout>
    <NoteCardLayout>
      <Box py={4}>
        <Heading mb={5} fontSize="2xl" color="blackAlpha.600">
          <Box as="span" fontSize="1.75rem">
            #
          </Box>
          &nbsp;最新のノート
        </Heading>
        <NoteCards notes={notes} />
      </Box>
    </NoteCardLayout>
  </ContentLayout>
);
