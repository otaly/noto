import { useUserName } from '@/features/auth/api/fetchUserName';
import { useAuthenticator } from '@aws-amplify/ui-react';
import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoggedInHeaderContents = () => {
  const { signOut } = useAuthenticator((context) => [context.signOut]);
  const navigate = useNavigate();
  const toast = useToast();

  const handleClickLogOut = useCallback(() => {
    signOut();
    navigate('/');
    toast({ title: 'ログアウトしました', position: 'top', duration: 2000 });
  }, [navigate, signOut, toast]);

  const { name } = useUserName({ config: { staleTime: 5 * 60 * 1000 } });

  return (
    <Flex px={6} py={2} align="center" justify="flex-end">
      <Menu>
        <MenuButton>
          <Avatar name={name} w={12} h={12} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleClickLogOut}>ログアウト</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
