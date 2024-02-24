import { CreateNoteForClientInput, CreateNoteForClientMutation } from '@/API';
import { ActionButton } from '@/components/Elements/ActionButton';
import { Link } from '@/components/Elements/Link';
import { Logo } from '@/components/Elements/Logo';
import { SimpleActionButton } from '@/components/Elements/SimpleActionButton';
import { useCurrentUser } from '@/features/auth/api/useCurrentUser';
import { createNoteForClient } from '@/graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Box, Center, Flex, Icon } from '@chakra-ui/react';
import { css } from '@emotion/react';
import {
  Add,
  FavoriteBorderOutlined,
  HomeOutlined,
  LibraryBooksOutlined,
} from '@mui/icons-material';
import { generateClient } from 'aws-amplify/api';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from './NavLink';

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
          key={item.name}
          end={index === 0}
          to={item.to}
          icon={
            <Icon
              as={item.icon}
              css={css`
                width: 2.5rem;
                height: 2.5rem;
              `}
            />
          }
        >
          {item.name}
        </NavLink>
      ))}
    </Flex>
  );
};

const TopLogo = () => (
  <Box
    as="div"
    css={css`
      container-type: inline-size;
    `}
  >
    <Logo
      css={css`
        @container (width <= 4rem) {
          display: none;
        }
      `}
    />
    <Logo
      simple
      css={css`
        @container (width > 4rem) {
          display: none;
        }
      `}
    />
  </Box>
);

const client = generateClient();

const Sidebar = () => {
  const { isSignedIn } = useCurrentUser();
  const navigate = useNavigate();

  const actionButtonIcon = (
    <Center
      as={Add}
      css={css`
        width: 2.25rem;
        height: 2.25rem;
      `}
    />
  );

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
    <Flex
      direction="column"
      w={{ base: 16, sm: 16, lg: 64 }}
      shrink={0}
      css={css`
        container-type: inline-size;
      `}
    >
      <Flex
        h={16}
        alignItems="center"
        paddingY="14px"
        paddingX={16}
        bg="primary.900"
        css={css`
          @container (width <= 4rem) {
            padding: 14px 16px;
            justify-content: center;
          }
        `}
      >
        <Link w="full" to="/">
          <TopLogo />
        </Link>
      </Flex>
      <Flex
        px={4}
        py={5}
        direction="column"
        grow={1}
        bg="primary.500"
        css={css`
          @container (width <= 4rem) {
            padding-inline: 5px;
          }
        `}
      >
        {isSignedIn && (
          <>
            <ActionButton
              icon={actionButtonIcon}
              marginBottom={6}
              css={css`
                @container (width <= 4rem) {
                  display: none;
                }
              `}
              onClick={handleCreateNote}
            >
              新規作成
            </ActionButton>
            <SimpleActionButton
              icon={actionButtonIcon}
              marginBottom={5}
              aria-label="新規作成"
              css={css`
                @container (width > 4rem) {
                  display: none;
                }
              `}
              onClick={handleCreateNote}
            />
          </>
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
    css={css`
      height: 100vh;
      height: 100dvh;
    `}
  >
    <Sidebar />
    <Flex direction="column" grow={1} position="relative" overflow="auto">
      {children}
    </Flex>
  </Flex>
);
