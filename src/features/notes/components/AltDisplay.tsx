import { Center, Text } from '@chakra-ui/react';

export type AltDisplayProps = {
  message?: string;
};

export const AltDisplay = ({ message = '' }: AltDisplayProps) => (
  <Center height="full" p={5}>
    <Text fontSize="lg" color="blackAlpha.500">
      {message}
    </Text>
  </Center>
);
