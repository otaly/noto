/** @jsxImportSource @emotion/react */
import { Avatar, Box, Center, Flex } from '@chakra-ui/react';
import { css } from '@emotion/react';
import {
  Add,
  FavoriteBorderOutlined,
  HomeOutlined,
  LibraryBooksOutlined,
} from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import logo from 'src/assets/logo.svg';
import { ActionButton } from '../Elements/ActionButton';

type SideNavigationItem = {
  name: string;
  to: string;
  icon: (props: SvgIconProps) => JSX.Element;
};

const SideNavigation = () => {
  const navigation: SideNavigationItem[] = [
    { name: 'home', to: '/', icon: HomeOutlined },
    { name: 'my notes', to: '/mynotes', icon: LibraryBooksOutlined },
    { name: 'favorites', to: '/favorites', icon: FavoriteBorderOutlined },
  ];

  return (
    <>
      {navigation.map((item, index) => (
        <NavLink
          end={index === 0}
          key={item.name}
          to={item.to}
          style={(navData) =>
            navData.isActive
              ? { background: 'var(--chakra-colors-primary-700)' }
              : {}
          }
          css={css({ borderRadius: '5px' })}
        >
          <Flex
            px={2}
            py="14px"
            gap={4}
            alignItems="center"
            borderRadius="5px"
            color="whiteAlpha.900"
            fontWeight="bold"
            fontSize="xl"
            role="group"
            _hover={{ bg: 'primary.300', color: 'white' }}
          >
            <Center
              as="span"
              color="whiteAlpha.800"
              _groupHover={{ color: 'white' }}
            >
              <item.icon css={css({ width: '2.5rem', height: '2.5rem' })} />
            </Center>
            <Box
              as="span"
              fontFamily="'Space Mono', monospace, sans-serif"
              letterSpacing="0.14rem"
            >
              {item.name}
            </Box>
          </Flex>
        </NavLink>
      ))}
    </>
  );
};

const Logo = () => <img src={logo} alt="noto" />;

const Sidebar = () => (
  <Flex direction="column" w={64}>
    <Box h={16} paddingY="14px" paddingLeft={16} bg="primary.900">
      <Link to="/" css={css({ display: 'inline-block' })}>
        <Logo />
      </Link>
    </Box>
    <Flex px={4} py={5} direction="column" grow={1} bg="primary.500">
      <ActionButton
        icon={<Add css={css({ width: '2.25rem', height: '2.25rem' })} />}
      >
        新規作成
      </ActionButton>
      <Flex direction="column" gap={4} marginTop={6}>
        <SideNavigation />
      </Flex>
    </Flex>
  </Flex>
);

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => (
  <Flex
    bg="base.500"
    overflow="hidden"
    css={css({ height: ['100vh', '100dvh'] })}
  >
    <Sidebar />
    <Flex direction="column" grow={1} overflow="auto">
      <Flex
        as="header"
        alignItems="center"
        justifyContent="end"
        h={16}
        px={6}
        py={2}
        bg="white"
        shadow="xs"
      >
        <Avatar w={12} h={12} />
      </Flex>
      <Flex as="main" direction="column">
        {children}
      </Flex>
    </Flex>
  </Flex>
);
