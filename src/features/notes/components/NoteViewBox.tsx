import { Box } from '@chakra-ui/react';

export type NoteViewBoxProps = {
  children: React.ReactNode;
};

export const NoteViewBox = ({ children }: NoteViewBoxProps) => (
  <Box
    px={{ base: 0, sm: 10 }}
    py={8}
    color="blackAlpha.800"
    lineHeight="taller"
    bg={{ base: 'none', sm: 'white' }}
    borderRadius="2xl"
    shadow={{ base: 'none', sm: 'base' }}
  >
    {children}
  </Box>
);
