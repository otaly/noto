import {
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  AlertDialog as ChakraAlertDialog,
} from '@chakra-ui/react';
import { useRef } from 'react';

export type AlertDialogProps = {
  isOpen: boolean;
  title?: string;
  text: string;
  okButtonText?: string;
  onOk: () => void;
  onCancel: () => void;
  onClose: () => void;
};

export const AlertDialog = ({
  isOpen,
  title,
  text,
  okButtonText,
  onOk,
  onCancel,
  onClose,
}: AlertDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  return (
    <ChakraAlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent maxW="min(calc(100dvw - 32px), 28rem)">
          {title ?? (
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>
          )}

          <AlertDialogBody>{text}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCancel}>
              キャンセル
            </Button>
            <Button colorScheme="red" onClick={onOk} ml={3}>
              {okButtonText ?? 'OK'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </ChakraAlertDialog>
  );
};
