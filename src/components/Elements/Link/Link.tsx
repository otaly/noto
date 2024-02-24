import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

type LinkProps = React.ComponentProps<typeof RouterLink> &
  Omit<React.ComponentProps<typeof ChakraLink>, 'as'>;

export const Link = (props: LinkProps) => (
  <ChakraLink as={RouterLink} {...props} />
);
