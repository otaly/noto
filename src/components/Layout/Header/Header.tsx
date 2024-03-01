import { PreviewSwitchProps } from '@/components/Elements/PreviewSwitch';
import { useCurrentUser } from '@/features/auth/api/useCurrentUser';
import {
  Box,
  Center,
  ChakraProps,
  Flex,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import { Menu } from '@mui/icons-material';
import React, { useRef } from 'react';
import { MobileSidebar } from '../MobileSidebar';
import { EditorHeaderContents } from './EditorHeaderContents';
import { LoggedInHeaderContents } from './LoggedInHeaderContents';
import { NotLoggedInHeaderContents } from './NotLoggedInHeaderContents';

export type HeaderProps =
  | {
      type?: 'normal';
    }
  | {
      type: 'editor';
      isLoading: boolean;
      onClickSave: () => void | Promise<void>;
      onChangeIsPreview: PreviewSwitchProps['onChangeIsPreview'];
    };

export const Header = (props: HeaderProps = { type: 'normal' }) => {
  const { isSignedIn } = useCurrentUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mobileNavOpenButtonRef = useRef<HTMLButtonElement>(null);

  let contents: React.ReactNode;
  let headerStyles: ChakraProps = {};

  if (!isSignedIn) {
    contents = <NotLoggedInHeaderContents />;
    headerStyles = { shadow: 'xs' };
  } else {
    switch (props.type) {
      case 'editor':
        contents = (
          <EditorHeaderContents
            isLoading={props.isLoading}
            onClickSave={props.onClickSave}
            onChangeIsPreview={props.onChangeIsPreview}
          />
        );
        headerStyles = {
          shadow: 'base',
          position: 'sticky',
          top: 0,
        };
        break;
      case 'normal':
      default:
        contents = <LoggedInHeaderContents />;
        headerStyles = { shadow: 'xs' };
        break;
    }
  }

  return (
    <>
      <Flex
        as="header"
        position={{ base: 'sticky', sm: 'unset' }}
        top={0}
        zIndex={100}
      >
        <Center
          as="button"
          display={{ base: 'flex', sm: 'none' }}
          p={2}
          backgroundColor="#061f35"
          ref={mobileNavOpenButtonRef}
          onClick={onOpen}
        >
          <Icon as={Menu} fill="whiteAlpha.900" fontSize={40} />
        </Center>
        <Box flex={1} bg="white" {...headerStyles}>
          {contents}
        </Box>
      </Flex>
      <MobileSidebar
        isOpen={isOpen}
        onClose={onClose}
        triggerRef={mobileNavOpenButtonRef}
      />
    </>
  );
};
