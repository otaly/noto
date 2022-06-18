import { AuthStatus } from '@/constants';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { CheckIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PreviewSwitch, PreviewSwitchProps } from '../Elements/PreviewSwitch';

export type HeaderType = 'normal' | 'editor';

export type HeaderProps = {
  type?: HeaderType;
  isLoading?: boolean;
  onClickUpdate?: () => void | Promise<void>;
  onChangeIsPreview?: PreviewSwitchProps['onChangeIsPreview'];
};

export const Header = ({
  type = 'normal',
  isLoading = false,
  onClickUpdate,
  onChangeIsPreview,
}: HeaderProps) => {
  const { authStatus, user, signOut } = useAuthenticator((context) => [
    context.authStatus,
    context.user,
  ]);
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClickLogOut = useCallback(() => {
    signOut();
    navigate('/');
    toast({ title: 'ログアウトしました', position: 'top', duration: 2000 });
  }, [navigate, signOut, toast]);

  let content: React.ReactNode;
  let headerStyles = {};
  if (authStatus !== AuthStatus.AUTHENTICATED) {
    content = (
      <>
        <Button
          variant="ghost"
          colorScheme="gray"
          color="gray.500"
          px={6}
          onClick={onOpen}
        >
          ログイン
        </Button>
        <Button colorScheme="blue" px={6} onClick={onOpen}>
          会員登録
        </Button>
      </>
    );
    headerStyles = {
      py: 3,
      justify: 'flex-end',
      shadow: 'xs',
      gap: 5,
    };
  } else {
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
        content = (
          <Menu>
            <MenuButton>
              <Avatar name={user?.username} w={12} h={12} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleClickLogOut}>ログアウト</MenuItem>
            </MenuList>
          </Menu>
        );
        headerStyles = { py: 2, justify: 'flex-end', shadow: 'xs' };
        break;
    }
  }

  return (
    <>
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
      {/* FIXME: 開いて閉じてもう一度開くと「Uncaught TypeError: Cannot read properties of null (reading 'focus')」が発生 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Authenticator />
        </ModalContent>
      </Modal>
    </>
  );
};
