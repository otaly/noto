import {
  PreviewSwitch,
  PreviewSwitchProps,
} from '@/components/Elements/PreviewSwitch';
import { CheckIcon } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';

type EditorHeaderContentsProps = {
  isLoading: boolean;
  onClickSave: () => void | Promise<void>;
  onChangeIsPreview: PreviewSwitchProps['onChangeIsPreview'];
};

export const EditorHeaderContents = ({
  isLoading,
  onClickSave,
  onChangeIsPreview,
}: EditorHeaderContentsProps) => (
  <Flex px={6} py={3} align="center" justify="space-between">
    <Button
      leftIcon={<CheckIcon />}
      iconSpacing={2}
      isLoading={isLoading}
      colorScheme="blue"
      px={5}
      onClick={onClickSave}
    >
      保存
    </Button>
    <PreviewSwitch onChangeIsPreview={onChangeIsPreview} />
  </Flex>
);
