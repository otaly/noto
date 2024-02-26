import { PreviewSwitchProps } from '@/components/Elements/PreviewSwitch';
import { useCurrentUser } from '@/features/auth/api/useCurrentUser';
import { Box, ChakraProps } from '@chakra-ui/react';
import React from 'react';
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
    <Box as="header" bg="white" zIndex={100} {...headerStyles}>
      {contents}
    </Box>
  );
};
