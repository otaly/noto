import { DeleteNoteInput, DeleteNoteMutation } from '@/API';
import { FavoriteButton } from '@/components/Elements/FavoriteButton';
import { ALT_TITLE } from '@/constants';
import { deleteNote } from '@/graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  chakra,
  Flex,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from '@chakra-ui/react';
import { MoreVert as MoreVertRaw } from '@mui/icons-material';
import { API, graphqlOperation } from 'aws-amplify';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

const MoreVert = chakra(MoreVertRaw);

export type NoteCardMenuProps = {
  title?: string;
  id: string;
};

const NoteCardMenu = ({ title, id }: NoteCardMenuProps) => {
  const toast = useToast();

  const handleClickDelete = useCallback(async () => {
    // 暫定でconfirm
    // eslint-disable-next-line no-restricted-globals
    if (!confirm(`'${title || ALT_TITLE}'を削除してよろしいですか？`)) {
      return;
    }

    const deleteInput: DeleteNoteInput = { id };
    (await API.graphql(
      graphqlOperation(deleteNote, {
        input: deleteInput,
      })
    )) as GraphQLResult<DeleteNoteMutation>;

    toast({
      title: '削除しました',
      status: 'success',
      position: 'top',
      duration: 2000,
    });
  }, [id, title, toast]);

  return (
    <Menu>
      <MenuButton
        as={IconButton}
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
      <MenuList>
        <MenuItem
          as={Link}
          to={`/note/${id}/edit`}
          icon={<EditIcon boxSize={5} />}
        >
          編集
        </MenuItem>
        <MenuDivider />
        <MenuItem
          icon={<DeleteIcon boxSize={5} />}
          color="red.500"
          onClick={handleClickDelete}
        >
          削除
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export type NoteCardProps = {
  id: string;
  title?: string;
  content?: string;
  favoriteCount?: number;
  isMyNote?: boolean;
};

export const NoteCard = ({
  id,
  title = '',
  content = '',
  favoriteCount = 0,
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
            {title || ALT_TITLE}
          </LinkOverlay>
        </Heading>
        {isMyNote && (
          <Box pl={3} pos="relative">
            <NoteCardMenu id={id} title={title} />
          </Box>
        )}
      </Flex>
      <Box mb={3} flexGrow={1} overflow="hidden">
        <Text color="blackAlpha.700">{content}</Text>
      </Box>
      <Box h="1.375rem">
        <Box display="inline-block" pos="relative">
          <FavoriteButton noteId={id} favoriteCount={favoriteCount} />
        </Box>
      </Box>
    </Flex>
  </LinkBox>
);
