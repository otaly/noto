/** @jsxImportSource @emotion/react */
import {
  Box,
  Center,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import { Favorite, FavoriteBorderOutlined } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';

export type NoteCardProps = {
  title?: string;
  text?: string;
  favoriteCnt?: number;
  isFavorite?: boolean;
  isMyNote?: boolean;
};

export const NoteCard = ({
  title = '',
  text = '',
  favoriteCnt = 0,
  isFavorite = false,
  isMyNote = false,
}: NoteCardProps) => (
  <LinkBox
    as="article"
    display="flex"
    h="17.875rem"
    pt={7}
    pb={5}
    px={6}
    bg="white"
    rounded="xl"
    shadow="md"
    transition="box-shadow 100ms"
    _hover={{ shadow: 'lg' }}
  >
    <Flex direction="column">
      <Heading mb={5} size="md" color="black">
        <LinkOverlay as={Link} to="/">
          {title}
        </LinkOverlay>
      </Heading>
      <Box mb={3} flexGrow={1} overflow="hidden">
        <Text color="blackAlpha.700">{text}</Text>
      </Box>
      <Box h="1.375rem">
        <Center
          as="button"
          type="button"
          color={isFavorite ? 'favorite.500' : 'blackAlpha.500'}
        >
          {isFavorite ? <Favorite /> : <FavoriteBorderOutlined />}
          <Box ml={0.5}>{favoriteCnt}</Box>
        </Center>
      </Box>
    </Flex>
  </LinkBox>
);
