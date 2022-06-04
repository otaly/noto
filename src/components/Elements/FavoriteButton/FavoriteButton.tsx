/** @jsxImportSource @emotion/react */
import { Box, Center, Circle } from '@chakra-ui/react';
import { Favorite, FavoriteBorderOutlined } from '@mui/icons-material';
import React from 'react';

export type FavoriteButtonProps = {
  isFavorite?: boolean;
  favoriteCount?: number;
  isBigButton?: boolean;
};

export const FavoriteButton = ({
  isFavorite = false,
  favoriteCount = 0,
  isBigButton = false,
}: FavoriteButtonProps) => {
  const circleProps = isBigButton ? { p: 3, bg: 'white', shadow: 'base' } : {};
  return (
    <Center
      as="button"
      type="button"
      color={isFavorite ? 'favorite.500' : 'blackAlpha.500'}
    >
      <Circle {...circleProps}>
        {isFavorite ? <Favorite /> : <FavoriteBorderOutlined />}
      </Circle>
      <Box ml={isBigButton ? 2 : 0.5}>{favoriteCount}</Box>
    </Center>
  );
};
