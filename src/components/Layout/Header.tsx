import { CheckIcon } from '@chakra-ui/icons';
import { Avatar, Button, Flex } from '@chakra-ui/react';
import React from 'react';
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
