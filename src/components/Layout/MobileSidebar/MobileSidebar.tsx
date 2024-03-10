import { CloseIcon } from '@chakra-ui/icons';
import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerProps,
  IconButton,
  Show,
} from '@chakra-ui/react';
import { Sidebar } from '../Sidebar';

export type MobileSidebarProps = {
  isOpen: boolean;
  triggerRef: DrawerProps['finalFocusRef'];
  onClose: () => void;
};

export const MobileSidebar = ({
  isOpen,
  triggerRef,
  onClose,
}: MobileSidebarProps) => (
  <Show below="sm">
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={triggerRef}
    >
      <DrawerOverlay />
      <DrawerContent backgroundColor="transparent" boxShadow="none">
        <DrawerCloseButton
          w="auto"
          h="auto"
          top={2}
          _hover={{ bg: 'transparent' }}
        >
          <IconButton
            borderColor="whiteAlpha.700"
            _hover={{ bg: 'whiteAlpha.300' }}
            icon={<CloseIcon color="whiteAlpha.700" />}
            variant="outline"
            isRound
            size="md"
            aria-label="閉じる"
          />
        </DrawerCloseButton>
        <Sidebar />
      </DrawerContent>
    </Drawer>
  </Show>
);
