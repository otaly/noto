import { Authenticator } from '@aws-amplify/ui-react';
import {
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

export const NotLoggedInHeaderContents = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex px={6} py={3} align="center" justify="flex-end" gap={5}>
        <Button
          variant="ghost"
          colorScheme="gray"
          color="gray.500"
          px={6}
          onClick={onOpen}
        >
          ログイン
        </Button>
        <Button colorScheme="blue" px={6} onClick={onOpen}>
          会員登録
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Authenticator signUpAttributes={['name']} />
        </ModalContent>
      </Modal>
    </>
  );
};
