import { ChangeFavoriteMutation } from '@/API';
import { changeFavorite } from '@/graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Box, Center, Circle } from '@chakra-ui/react';
import { Favorite, FavoriteBorderOutlined } from '@mui/icons-material';
import { API, graphqlOperation } from 'aws-amplify';
import { useCallback } from 'react';

export type FavoriteButtonProps = {
  noteId?: string;
  isFavorite?: boolean;
  favoriteCount?: number;
  isBigButton?: boolean;
};

export const FavoriteButton = ({
  noteId,
  isFavorite = false,
  favoriteCount = 0,
  isBigButton = false,
}: FavoriteButtonProps) => {
  const handleClick = useCallback(async () => {
    if (noteId == null) {
      return;
    }
    (await API.graphql(
      graphqlOperation(changeFavorite, {
        input: { noteId, isFavorite: !isFavorite },
      })
    )) as GraphQLResult<ChangeFavoriteMutation>;
  }, [isFavorite, noteId]);

  const circleProps = isBigButton ? { p: 3, bg: 'white', shadow: 'base' } : {};
  return (
    <Center
      as="button"
      type="button"
      color={isFavorite ? 'favorite.500' : 'blackAlpha.500'}
      onClick={handleClick}
    >
      <Circle {...circleProps}>
        {isFavorite ? <Favorite /> : <FavoriteBorderOutlined />}
      </Circle>
      <Box ml={isBigButton ? 2 : 0.5}>{favoriteCount}</Box>
    </Center>
  );
};
