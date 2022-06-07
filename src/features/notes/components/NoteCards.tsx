import React from 'react';
import { NoteCard, NoteCardProps } from './NoteCard';
import { NoteCardsGrid } from './NoteCardsGrid';

export type NoteCardsProps = { notes?: NoteCardProps[] };

export const NoteCards = ({ notes = [] }: NoteCardsProps) => (
  <NoteCardsGrid>
    {notes.map((noteProps) => (
      <NoteCard key={noteProps.id} {...noteProps} />
    ))}
  </NoteCardsGrid>
);
