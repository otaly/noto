import { Box } from '@chakra-ui/react';
import 'zenn-content-css';
import { NoteViewBox } from './NoteViewBox';

export type HtmlViewProps = {
  html?: string;
};

export const HtmlView = ({ html = '' }: HtmlViewProps) => (
  <NoteViewBox>
    <Box dangerouslySetInnerHTML={{ __html: html }} className="znc" />
  </NoteViewBox>
);
