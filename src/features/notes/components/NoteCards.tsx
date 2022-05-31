/** @jsxImportSource @emotion/react */
import { Grid } from '@chakra-ui/react';
import React from 'react';
import { NoteCard, NoteCardProps } from './NoteCard';

export type NoteCardsProps = { notes?: NoteCardProps[] };

export const NoteCards = ({ notes = [] }: NoteCardsProps) => (
  // TODO: paddingは後で消す
  <Grid
    templateColumns="repeat(auto-fill, 21rem)"
    px="min(10%, 4rem)"
    py={12}
    justifyContent="center"
    rowGap={10}
    columnGap={6}
  >
    {notes.map((noteProps) => (
      <NoteCard {...noteProps} />
    ))}
  </Grid>
);
