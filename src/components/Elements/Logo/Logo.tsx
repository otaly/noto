import { IconProps } from '@chakra-ui/react';
import { NormalLogo } from './NormalLogo';
import { SimpleLogo } from './SimpleLogo';

type LogoProps = {
  simple?: boolean;
} & IconProps;

export const Logo = ({ simple = false, ...props }: LogoProps) =>
  simple ? <SimpleLogo {...props} /> : <NormalLogo {...props} />;
