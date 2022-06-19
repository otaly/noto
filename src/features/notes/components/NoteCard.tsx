import { FavoriteButton } from '@/components/Elements/FavoriteButton';
import {
  Box,
  chakra,
  Flex,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import { MoreVert as MoreVertRaw } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const MoreVert = chakra(MoreVertRaw);

export type NoteCardProps = {
  id: number;
  title?: string;
  content?: string;
  favoriteCount?: number;
  isFavorite?: boolean;
  isMyNote?: boolean;
};

export const NoteCard = ({
  id,
  title = '',
  content = '',
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
    role="group"
    _hover={{ shadow: 'lg' }}
  >
    <Flex direction="column" w="full">
      <Flex align="start" justify="space-between">
        <Heading size="md" mb={5} w="full" color="black">
          <LinkOverlay as={Link} to={`/note/${id}`}>
            {title || '無題'}
          </LinkOverlay>
        </Heading>
        {isMyNote && (
          <Box pl={3} pos="relative">
            <IconButton
              icon={<MoreVert fontSize="2rem" />}
              aria-label="メニュー"
              size="sm"
              color="blackAlpha.300"
              isRound
              variant="unstyled"
              pos="absolute"
              top={-1}
              right={-4}
              _groupHover={{ color: 'blackAlpha.800' }}
            />
          </Box>
        )}
      </Flex>
      <Box mb={3} flexGrow={1} overflow="hidden">
        <Text color="blackAlpha.700">{content}</Text>
      </Box>
      <Box h="1.375rem">
        <FavoriteButton isFavorite={isFavorite} favoriteCount={favoriteCount} />
      </Box>
    </Flex>
  </LinkBox>
);
