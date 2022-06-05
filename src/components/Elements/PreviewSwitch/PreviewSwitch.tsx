/** @jsxImportSource @emotion/react */
import { Center, chakra, Switch } from '@chakra-ui/react';
import {
  ModeEdit as ModeEditRaw,
  PlayArrow as PlayArrowRaw,
} from '@mui/icons-material';
import React, { useCallback, useState } from 'react';

export type PreviewSwitchProps = {
  defaultChecked?: boolean;
  onChangeIsPreview?: (isPreview: boolean) => void;
};

const ModeEdit = chakra(ModeEditRaw);
const PlayArrow = chakra(PlayArrowRaw);

export const PreviewSwitch = ({
  defaultChecked,
  onChangeIsPreview,
}: PreviewSwitchProps) => {
  const [isPreview, setIsPreview] = useState(defaultChecked ?? false);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChangeIsPreview) {
        onChangeIsPreview(event.target.checked);
      }
      setIsPreview(event.target.checked);
    },
    [onChangeIsPreview]
  );
  return (
    <Center as="label" htmlFor="previewSwitch">
      <ModeEdit
        h="1.1875rem"
        w="1.1875rem"
        color={isPreview ? 'gray.400' : 'gray.600'}
      />
      <Switch
        id="previewSwitch"
        defaultChecked={defaultChecked}
        size="lg"
        mx={1}
        onChange={handleChange}
      />
      <PlayArrow
        h="1.1875rem"
        w="1.1875rem"
        color={isPreview ? 'blue.500' : 'gray.400'}
      />
    </Center>
  );
};
