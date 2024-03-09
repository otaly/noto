import { ChakraProps, Flex } from '@chakra-ui/react';
import React from 'react';

type ContentLayoutProps = {
  bg?: ChakraProps['bg'];
  header: React.ReactNode;
  children: React.ReactNode;
};

export const ContentLayout = ({ bg, header, children }: ContentLayoutProps) => (
  <>
    {header}
    <Flex as="main" bg={bg} direction="column" grow={1} py={8}>
      {children}
    </Flex>
  </>
);
