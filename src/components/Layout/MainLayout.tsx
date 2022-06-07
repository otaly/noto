import { CheckIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Center, Flex } from '@chakra-ui/react';
import { css } from '@emotion/react';
import {
  Add,
  FavoriteBorderOutlined,
  HomeOutlined,
  LibraryBooksOutlined,
} from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { ActionButton } from '../Elements/ActionButton';
import { PreviewSwitch, PreviewSwitchProps } from '../Elements/PreviewSwitch';

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

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Flex direction="column" w={64} shrink={0}>
      <Box h={16} paddingY="14px" paddingLeft={16} bg="primary.900">
        <Link to="/" css={css({ display: 'inline-block' })}>
          <Logo />
        </Link>
      </Box>
      <Flex px={4} py={5} direction="column" grow={1} bg="primary.500">
        <ActionButton
          icon={<Add css={css({ width: '2.25rem', height: '2.25rem' })} />}
          onClick={() => navigate('/note/0/edit')}
        >
          新規作成
        </ActionButton>
        <Flex direction="column" gap={4} marginTop={6}>
          <SideNavigation />
        </Flex>
      </Flex>
    </Flex>
  );
};

export type HeaderType = 'normal' | 'editor';

type HeaderProps = {
  type: HeaderType;
  isLoading?: boolean;
  onClickUpdate?: () => void | Promise<void>;
  onChangeIsPreview?: PreviewSwitchProps['onChangeIsPreview'];
};

const Header = ({
  type,
  isLoading,
  onClickUpdate,
  onChangeIsPreview,
}: HeaderProps) => {
  let content: React.ReactNode;
  let headerStyles = {};
  switch (type) {
    case 'editor':
      content = (
        <>
          <Button
            leftIcon={<CheckIcon />}
            iconSpacing={2}
            isLoading={isLoading}
            colorScheme="blue"
            px={5}
            onClick={onClickUpdate}
          >
            保存
          </Button>
          <PreviewSwitch onChangeIsPreview={onChangeIsPreview} />
        </>
      );
      headerStyles = {
        py: 3,
        justify: 'space-between',
        shadow: 'base',
        position: 'sticky',
        top: 0,
      };
      break;
    case 'normal':
    default:
      content = <Avatar name="Hiroshi Sato" w={12} h={12} />;
      headerStyles = { py: 2, justify: 'end', shadow: 'xs' };
      break;
  }
  return (
    <Flex
      as="header"
      align="center"
      h={16}
      px={6}
      bg="white"
      zIndex={100}
      {...headerStyles}
    >
      {content}
    </Flex>
  );
};

type MainLayoutProps = {
  children: React.ReactNode;
};

export const HeaderContext = createContext<{
  setHeaderState?: Dispatch<SetStateAction<HeaderProps>>;
}>({
  setHeaderState: undefined,
});

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [headerState, setHeaderState] = useState<HeaderProps>({
    type: 'normal',
  });
  return (
    <Flex
      bg="base.500"
      overflow="hidden"
      css={css({ height: ['100vh', '100dvh'] })}
    >
      <Sidebar />
      <Flex direction="column" grow={1} position="relative" overflow="auto">
        <Header {...headerState} />
        <Flex as="main" direction="column">
          {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
          <HeaderContext.Provider value={{ setHeaderState }}>
            {children}
          </HeaderContext.Provider>
        </Flex>
      </Flex>
    </Flex>
  );
};
