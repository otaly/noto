import { CreateNoteForClientInput, CreateNoteForClientMutation } from '@/API';
import logo from '@/assets/logo.svg';
import { useCurrentUser } from '@/features/auth/api/useCurrentUser';
import { createNoteForClient } from '@/graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Box, Center, Flex } from '@chakra-ui/react';
import { css } from '@emotion/react';
import {
  Add,
  FavoriteBorderOutlined,
  HomeOutlined,
  LibraryBooksOutlined,
} from '@mui/icons-material';
import { generateClient } from 'aws-amplify/api';
import React, { useCallback } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ActionButton } from '../Elements/ActionButton';

type SideNavigationItem = {
  name: string;
  to: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: (props: any) => JSX.Element | null;
};

const SideNavigation = () => {
  const navigation: SideNavigationItem[] = [
    { name: 'home', to: '/', icon: HomeOutlined },
    { name: 'my notes', to: '/mynotes', icon: LibraryBooksOutlined },
    { name: 'favorites', to: '/favorites', icon: FavoriteBorderOutlined },
  ];

  return (
    <Flex direction="column" gap={4}>
      {navigation.map((item, index) => (
        <NavLink
          end={index === 0}
          key={item.name}
          to={item.to}
          style={(navData) =>
            navData.isActive
              ? {
                  background: 'var(--chakra-colors-primary-700)',
                  borderRadius: '5px',
                }
              : { borderRadius: '5px' }
          }
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
    </Flex>
  );
};

const Logo = () => <img src={logo} alt="noto" />;

const client = generateClient();

const Sidebar = () => {
  const { isSignedIn } = useCurrentUser();
  const navigate = useNavigate();

  const handleCreateNote = useCallback(async () => {
    if (!isSignedIn) {
      return;
    }
    const newNote: CreateNoteForClientInput = {
      title: '',
      markdown: '',
    };
    const noteData = (await client.graphql({
      query: createNoteForClient,
      variables: { input: newNote },
    })) as GraphQLResult<CreateNoteForClientMutation>;
    const note = noteData.data?.createNoteForClient;
    if (!note) {
      return;
    }
    navigate(`/note/${note.id}/edit`);
  }, [navigate, isSignedIn]);

  return (
    <Flex direction="column" w={64} shrink={0}>
      <Box h={16} paddingY="14px" paddingLeft={16} bg="primary.900">
        <Link to="/" css={css({ display: 'inline-block' })}>
          <Logo />
        </Link>
      </Box>
      <Flex px={4} py={5} direction="column" grow={1} bg="primary.500">
        {isSignedIn && (
          <ActionButton
            icon={<Add css={css({ width: '2.25rem', height: '2.25rem' })} />}
            marginBottom={6}
            onClick={handleCreateNote}
          >
            新規作成
          </ActionButton>
        )}
        <SideNavigation />
      </Flex>
    </Flex>
  );
};

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
    <Flex direction="column" grow={1} position="relative" overflow="auto">
      {children}
    </Flex>
  </Flex>
);
