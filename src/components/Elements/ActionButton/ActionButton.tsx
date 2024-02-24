import { Box, Center, chakra, forwardRef } from '@chakra-ui/react';
import React from 'react';

export type ActionButtonProps = React.ComponentPropsWithRef<'button'> & {
  icon?: React.ReactElement;
};

const ActionButtonRaw = forwardRef<ActionButtonProps, 'button'>(
  ({ icon, children, ...props }, ref) => (
    <Center
      as="button"
      ref={ref}
      type="button"
      py={4}
      bg="accent.500"
      color="white"
      fontSize="md"
      fontWeight="bold"
      pos="relative"
      rounded="full"
      _hover={{ bg: 'accent.600', color: 'whiteAlpha.900' }}
      {...props}
    >
      <Center pos="absolute" left="14px">
        {icon}
      </Center>
      <Box>{children}</Box>
    </Center>
  ),
);

export const ActionButton = chakra(ActionButtonRaw);
