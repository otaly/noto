import { Box } from '@chakra-ui/react';
import 'easymde/dist/easymde.min.css';
import React, { useMemo } from 'react';
import { SimpleMdeReact, SimpleMDEReactProps } from 'react-simplemde-editor';
import './MDEditor.css';

export type MDEditorProps = {
  value?: string;
  onChange?: SimpleMDEReactProps['onChange'];
};

export const MDEditor = ({ value, onChange }: MDEditorProps) => {
  const options = useMemo<SimpleMDEReactProps['options']>(
    () => ({
      placeholder: '# Header\n- list item\n- list item\n\ntext...',
      spellChecker: false,
      autofocus: false,
      status: false,
      toolbar: false,
      autosave: undefined,
    }),
    []
  );

  return (
    <Box
      px={10}
      py={8}
      color="blackAlpha.800"
      lineHeight="taller"
      bg="white"
      borderRadius="2xl"
      shadow="base"
    >
      <SimpleMdeReact options={options} value={value} onChange={onChange} />
    </Box>
  );
};
