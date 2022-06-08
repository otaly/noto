import { ContentLayout, Header } from '@/components/Layout';
import { Box } from '@chakra-ui/react';
import React from 'react';
import { NoteCardProps } from '../components/NoteCard';
import { NoteCards } from '../components/NoteCards';
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

export const Favorites = () => (
  <ContentLayout header={<Header />}>
    <NoteCardsLayout>
      <Box py={4}>
        <NoteCards notes={notes} />
      </Box>
    </NoteCardsLayout>
  </ContentLayout>
);
