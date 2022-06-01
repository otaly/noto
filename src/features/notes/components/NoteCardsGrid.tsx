/** @jsxImportSource @emotion/react */
import { Grid } from '@chakra-ui/react';
import React from 'react';

type NoteCardsGridProps = { children: React.ReactNode };

export const NoteCardsGrid = ({ children }: NoteCardsGridProps) => (
  <Grid
    templateColumns="repeat(auto-fill, 21rem)"
    justifyContent="center"
    rowGap={10}
    columnGap={6}
  >
    {children}
  </Grid>
);
