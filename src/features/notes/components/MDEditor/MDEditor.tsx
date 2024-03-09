import 'easymde/dist/easymde.min.css';
import { useMemo } from 'react';
import { SimpleMdeReact, SimpleMDEReactProps } from 'react-simplemde-editor';
import { NoteViewBox } from '../NoteViewBox';
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
    [],
  );

  return (
    <NoteViewBox>
      <SimpleMdeReact options={options} value={value} onChange={onChange} />
    </NoteViewBox>
  );
};
