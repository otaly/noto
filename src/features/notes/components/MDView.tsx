/** @jsxImportSource @emotion/react */
import { Box } from '@chakra-ui/react';
import React from 'react';

export type MDViewProps = {
  markdown?: string;
};

export const MDView = ({ markdown = '' }: MDViewProps) => (
  <Box
    px={10}
    py={8}
    color="blackAlpha.800"
    lineHeight="taller"
    bg="white"
    borderRadius="2xl"
    shadow="base"
  >
    {markdown}
  </Box>
);
