import { Textarea } from '@chakra-ui/react';
import autosize from 'autosize';
import React, { useEffect } from 'react';

export type TitleTextareaProps = {
  value?: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
};

export const TitleTextarea = ({
  value = '',
  disabled = false,
  onChange,
}: TitleTextareaProps) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      autosize(textarea);
      // value変化後にupdateを行う必要がある
      autosize.update(textarea);
      return () => {
        autosize.destroy(textarea);
      };
    }
  }, [value]);

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      disabled={disabled}
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
