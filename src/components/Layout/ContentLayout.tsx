/** @jsxImportSource @emotion/react */
import { Flex } from '@chakra-ui/react';
import React from 'react';

type ContentLayoutProps = {
  children: React.ReactNode;
};

export const ContentLayout = ({ children }: ContentLayoutProps) => (
  <Flex direction="column" justifyContent="center" py={8}>
    {children}
  </Flex>
);
