/** @jsxImportSource @emotion/react */
import { Avatar, Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { formatDate } from '../../../utils/format';

export type AuthorProps = {
  avatarSrc?: string;
  name?: string;
  lastEditDate?: Date;
};

export const Author = ({ avatarSrc, name = '', lastEditDate }: AuthorProps) => (
  <Flex align="center">
    <Avatar name={name} src={avatarSrc} size="sm" />
    <Box ml={3} fontSize="xs" lineHeight="none">
      <Box as="p" color="blackAlpha.900">
        {name}
      </Box>
      {lastEditDate ? (
        <Box as="p" mt={2} color="blackAlpha.500">
          {formatDate(lastEditDate)}
        </Box>
      ) : undefined}
    </Box>
  </Flex>
);
