import { Box } from '@chakra-ui/react';
import React from 'react';

type NoteCardLayoutProps = {
  children: React.ReactNode;
};

export const NoteCardsLayout = ({ children }: NoteCardLayoutProps) => (
  <Box px="min(10%, 4rem)">{children}</Box>
);
