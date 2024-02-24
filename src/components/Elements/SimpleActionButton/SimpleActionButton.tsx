import { IconButton, chakra } from '@chakra-ui/react';

type SimpleActionButtonProps = {
  icon: React.ReactElement;
  'aria-label': string;
  onClick: () => void;
};

export const SimpleActionButtonRaw = ({
  icon,
  onClick,
  ...props
}: SimpleActionButtonProps) => (
  <IconButton
    icon={icon}
    isRound
    variant="solid"
    bg="accent.500"
    color="white"
    height="3.375rem"
    width="3.375rem"
    _hover={{ bg: 'accent.600', color: 'whiteAlpha.900' }}
    onClick={onClick}
    {...props}
  />
);

export const SimpleActionButton = chakra(SimpleActionButtonRaw);
