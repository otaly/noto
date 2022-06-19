import { Textarea } from '@chakra-ui/react';
import autosize from 'autosize';
import React, { useEffect } from 'react';

export type TitleTextareaProps = {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
};

export const TitleTextarea = ({ value = '', onChange }: TitleTextareaProps) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      autoFocus
      resize="none"
      placeholder="Title"
      spellCheck={false}
      focusBorderColor="transparent"
      maxLength={70}
      rows={1}
      p={0}
      mb={10}
      color="black"
      fontSize="2rem"
      fontWeight="bold"
      border="none"
      _placeholder={{ color: 'gray.400' }}
      onChange={onChange}
    />
  );
};
