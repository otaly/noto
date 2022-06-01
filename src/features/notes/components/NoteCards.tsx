/** @jsxImportSource @emotion/react */
import { Grid } from '@chakra-ui/react';
import React from 'react';
import { NoteCard, NoteCardProps } from './NoteCard';

export type NoteCardsProps = { notes?: (NoteCardProps & { id: string })[] };

export const NoteCards = ({ notes = [] }: NoteCardsProps) => (
  <Grid
    templateColumns="repeat(auto-fill, 21rem)"
    justifyContent="center"
    rowGap={10}
    columnGap={6}
  >
    {notes.map((noteProps) => (
      <NoteCard key={noteProps.id} {...noteProps} />
    ))}
  </Grid>
);
