import { Box, Center, Link as ChakraLink } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { NavLink as RouterNavLink } from 'react-router-dom';

type NavLinkProps = {
  end: boolean;
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export const NavLink = ({ end, to, icon, children }: NavLinkProps) => (
  <ChakraLink
    as={RouterNavLink}
    end={end}
    to={to}
    display="flex"
    borderRadius={5}
    px={2}
    py="14px"
    gap={4}
    alignItems="center"
    color="whiteAlpha.900"
    fontWeight="bold"
    fontSize="xl"
    role="group"
    _activeLink={{ background: 'primary.700' }}
    _hover={{ bg: 'primary.300', color: 'white' }}
    css={css`
      container-type: inline-size;
      @container (width <= 7rem) {
        justify-content: center;
        padding: 7px;
        border-radius: 50%;
      }
    `}
  >
    <Center as="span" color="whiteAlpha.800" _groupHover={{ color: 'white' }}>
      {icon}
    </Center>
    <Box
      as="span"
      fontFamily="'Space Mono', monospace, sans-serif"
      letterSpacing="0.14rem"
      css={css`
        @container (width < 7rem) {
          display: none;
        }
      `}
    >
      {children}
    </Box>
  </ChakraLink>
);
