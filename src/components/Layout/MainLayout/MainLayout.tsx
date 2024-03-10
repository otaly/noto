import { Flex, Hide } from '@chakra-ui/react';
import React from 'react';
import { Sidebar } from '../Sidebar';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => (
  <Flex minH="$100vh">
    <Hide below="sm">
      <Flex position="sticky" top={0} h="$100vh">
        <Sidebar />
      </Flex>
    </Hide>
    <Flex direction="column" grow={1} position="relative">
      {children}
    </Flex>
  </Flex>
);
