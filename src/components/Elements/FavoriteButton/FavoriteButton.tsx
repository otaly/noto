/** @jsxImportSource @emotion/react */
import { Box, Center, Circle } from '@chakra-ui/react';
import { Favorite, FavoriteBorderOutlined } from '@mui/icons-material';
import React from 'react';

export type FavoriteButtonProps = {
  isFavorite?: boolean;
  favoriteCount?: number;
};

export const FavoriteButton = ({
  isFavorite = false,
  favoriteCount = 0,
}: FavoriteButtonProps) => (
  <Center
    as="button"
    type="button"
    color={isFavorite ? 'favorite.500' : 'blackAlpha.500'}
  >
    <Circle>{isFavorite ? <Favorite /> : <FavoriteBorderOutlined />}</Circle>
    <Box ml={0.5}>{favoriteCount}</Box>
  </Center>
);
