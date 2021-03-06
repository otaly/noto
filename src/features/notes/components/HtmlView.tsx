import { Box } from '@chakra-ui/react';
import 'zenn-content-css';

export type HtmlViewProps = {
  html?: string;
};

export const HtmlView = ({ html = '' }: HtmlViewProps) => (
  <Box
    dangerouslySetInnerHTML={{ __html: html }}
    className="znc"
    px={10}
    py={8}
    color="blackAlpha.800"
    lineHeight="taller"
    bg="white"
    borderRadius="2xl"
    shadow="base"
  />
);
