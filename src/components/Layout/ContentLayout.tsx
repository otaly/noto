import { Flex } from '@chakra-ui/react';
import React from 'react';

type ContentLayoutProps = {
  header: React.ReactNode;
  children: React.ReactNode;
};

export const ContentLayout = ({ header, children }: ContentLayoutProps) => (
  <>
    {header}
    <Flex as="main" direction="column">
      <Flex direction="column" justifyContent="center" py={8}>
        {children}
      </Flex>
    </Flex>
  </>
);
