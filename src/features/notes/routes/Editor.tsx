import { UpdateNoteForClientInput, UpdateNoteForClientMutation } from '@/API';
import { ContentLayout, Header } from '@/components/Layout';
import { updateNoteForClient } from '@/graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Box, Container, useBoolean } from '@chakra-ui/react';
import { generateClient } from 'aws-amplify/api';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMDPreview } from '../api/fetchMDPreview';
import { useNote } from '../api/fetchNote';
import { HtmlView } from '../components/HtmlView';
import { MDEditor } from '../components/MDEditor';
import { TitleTextarea } from '../components/TitleTextarea';

const client = generateClient();

export const Editor = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useBoolean();
  const [isPreviewMode, setIsPreviewMode] = useBoolean(false);

  const { data } = useNote({
    id: id ?? '',
    config: { enabled: id != null, refetchOnReconnect: false },
  });
  const note = data;

  const { data: previewData } = useMDPreview({
    noteId: id ?? '',
    markdown: markdown || (note?.markdown ?? ''),
    config: { enabled: id != null && isPreviewMode },
  });

  useEffect(() => {
    setTitle(note?.title ?? '');
    setMarkdown(note?.markdown ?? '');
  }, [note]);

  const handleTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) =>
      setTitle(event.target.value),
    [],
  );
  const handleMarkdownChange = useCallback(
    (value: string) => setMarkdown(value),
    [],
  );

  const handleChangeIsPreview = useCallback(() => {
    setIsPreviewMode.toggle();
  }, [setIsPreviewMode]);

  const handleClickSave = useCallback(async () => {
    if (id == null) {
      return;
    }
    setIsLoading.on();
    const update: UpdateNoteForClientInput = { id, title, markdown };
    (await client.graphql({
      query: updateNoteForClient,
      variables: { input: update },
    })) as GraphQLResult<UpdateNoteForClientMutation>;
    setIsLoading.off();
  }, [id, setIsLoading, title, markdown]);

  return (
    <ContentLayout
      header={
        <Header
          type="editor"
          isLoading={isLoading}
          onClickSave={handleClickSave}
          onChangeIsPreview={handleChangeIsPreview}
        />
      }
    >
      <Container
        as="article"
        px="min(15%, 12.25rem)"
        py={8}
        maxW="container.xl"
      >
        <TitleTextarea
          value={title}
          disabled={isPreviewMode}
          onChange={handleTitleChange}
        />
        <Box as="section" mb={6}>
          {isPreviewMode ? (
            <HtmlView html={previewData?.previewMD} />
          ) : (
            <MDEditor value={markdown} onChange={handleMarkdownChange} />
          )}
        </Box>
      </Container>
    </ContentLayout>
  );
};
