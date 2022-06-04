/** @jsxImportSource @emotion/react */
import { Box, Center, forwardRef } from '@chakra-ui/react';
import clsx from 'clsx';
import React from 'react';

export type ActionButtonProps = React.ButtonHTMLAttributes<
  HTMLDivElement & HTMLButtonElement
> & {
  icon?: React.ReactElement;
};

export const ActionButton = forwardRef<ActionButtonProps, 'button'>(
  ({ type = 'button', className = '', onClick, icon, ...props }, ref) => (
    <Center
      as="button"
      ref={ref}
      type={type}
      className={clsx(className)}
      py={4}
      bg="accent.500"
      color="white"
      fontSize="md"
      fontWeight="bold"
      pos="relative"
      rounded="full"
      _hover={{ bg: 'accent.600', color: 'whiteAlpha.900' }}
      onClick={onClick}
    >
      <Center pos="absolute" left="14px">
        {icon}
      </Center>
      <Box>{props.children}</Box>
    </Center>
  )
);
