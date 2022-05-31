/** @jsxImportSource @emotion/react */
import { Box, Center } from '@chakra-ui/react';
import { css } from '@emotion/react';
import clsx from 'clsx';
import React from 'react';

export type ActionButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: React.ReactElement;
  };

export const ActionButton = React.forwardRef<
  HTMLButtonElement,
  ActionButtonProps
>(({ type = 'button', className = '', icon, ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={clsx(className)}
    css={css`
      background: #ffa800;
      border-radius: 9999px;
      &:hover {
        background: #f09e00;
      }
    `}
  >
    <Center
      paddingY={4}
      pos="relative"
      color="white"
      fontSize="md"
      fontWeight="bold"
      _hover={{ color: 'whiteAlpha.900' }}
    >
      <Center pos="absolute" left="14px">
        {icon}
      </Center>
      <Box>{props.children}</Box>
    </Center>
  </button>
));
