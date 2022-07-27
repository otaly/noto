import { Center, Text } from '@chakra-ui/react';

export type UnauthDisplayProps = {
  message?: string;
};

export const UnauthDisplay = ({ message = '' }: UnauthDisplayProps) => (
  <Center height="full" p={5}>
    <Text fontSize="lg" color="blackAlpha.500">
      {message}
    </Text>
  </Center>
);
