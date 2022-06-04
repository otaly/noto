/** @jsxImportSource @emotion/react */
import {
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FavoriteButton } from '../../../components/Elements/FavoriteButton';

export type NoteCardProps = {
  id: number;
  title?: string;
  text?: string;
  favoriteCount?: number;
  isFavorite?: boolean;
  isMyNote?: boolean;
};

export const NoteCard = ({
  id,
  title = '',
  text = '',
  favoriteCount = 0,
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
        <LinkOverlay as={Link} to={`/note/${id}`}>
          {title}
        </LinkOverlay>
      </Heading>
      <Box mb={3} flexGrow={1} overflow="hidden">
        <Text color="blackAlpha.700">{text}</Text>
      </Box>
      <Box h="1.375rem">
        <FavoriteButton isFavorite={isFavorite} favoriteCount={favoriteCount} />
      </Box>
    </Flex>
  </LinkBox>
);
