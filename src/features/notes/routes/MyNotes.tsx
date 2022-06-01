/** @jsxImportSource @emotion/react */
import { Box } from '@chakra-ui/react';
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
    isFavorite: i % 2 === 0,
  }));

export const MyNotes = () => (
  <ContentLayout>
    <NoteCardLayout>
      <Box py={4}>
        <NoteCards notes={notes} />
      </Box>
    </NoteCardLayout>
  </ContentLayout>
);
