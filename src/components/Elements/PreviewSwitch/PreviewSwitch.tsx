/** @jsxImportSource @emotion/react */
import { Center, Switch } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { ModeEdit, PlayArrow } from '@mui/icons-material';
import React from 'react';

export type PreviewSwitchProps = {
  defaultChecked?: boolean;
  onChangeIsPreview?: (isPreview: boolean) => void | Promise<void>;
};

export const PreviewSwitch = ({
  defaultChecked,
  onChangeIsPreview,
}: PreviewSwitchProps) => (
  <Center>
    <ModeEdit css={css({ height: '19px', width: '19px' })} />
    <Switch
      defaultChecked={defaultChecked}
      size="lg"
      mx={1}
      onChange={
        onChangeIsPreview
          ? (event) => onChangeIsPreview(event.target.checked)
          : undefined
      }
    />
    <PlayArrow css={css({ height: '19px', width: '19px' })} />
  </Center>
);
