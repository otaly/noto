import { Flex } from '@chakra-ui/react';
import { css } from '@emotion/react';
import React from 'react';
import { Sidebar } from '../Sidebar';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => (
  <Flex
    css={css`
      min-height: 100vh;
      min-height: 100dvh;
    `}
  >
    <Flex
      position="sticky"
      top={0}
      display={{ base: 'none', sm: 'flex' }}
      h="$100vh"
    >
      <Sidebar />
    </Flex>
    <Flex direction="column" grow={1} position="relative">
      {children}
    </Flex>
  </Flex>
);
