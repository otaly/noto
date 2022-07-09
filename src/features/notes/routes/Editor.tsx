import {
  GetNoteQuery,
  PreviewMDMutation,
  UpdateNoteForClientInput,
  UpdateNoteForClientMutation,
} from '@/API';
import { ContentLayout, Header } from '@/components/Layout';
import { previewMD, updateNoteForClient } from '@/graphql/mutations';
import { getNote } from '@/graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Box, Container, useBoolean } from '@chakra-ui/react';
import { API, graphqlOperation } from 'aws-amplify';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HtmlView } from '../components/HtmlView';
import { MDEditor } from '../components/MDEditor';
import { TitleTextarea } from '../components/TitleTextarea';

export const Editor = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [previewHtml, setPreviewHtml] = useState('');
  const [isLoading, setIsLoading] = useBoolean();
  const [isPreviewMode, setIsPreviewMode] = useBoolean(false);

  useEffect(() => {
    if (id == null) {
      return;
    }
    const fetchNote = async () => {
      const noteData = (await API.graphql(
        graphqlOperation(getNote, { id })
      )) as GraphQLResult<GetNoteQuery>;
      const note = noteData.data?.getNote;
      setTitle(note?.title ?? '');
      setMarkdown(note?.markdown ?? '');
    };
    fetchNote();
  }, [id]);

  const handleTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) =>
      setTitle(event.target.value),
    []
  );
  const handleMarkdownChange = useCallback(
    (value: string) => setMarkdown(value),
    []
  );

  const handleChangeIsPreview = useCallback(
    async (isPreview: boolean) => {
      if (isPreview) {
        const previewResult = (await API.graphql(
          graphqlOperation(previewMD, { markdown })
        )) as GraphQLResult<PreviewMDMutation>;
        setPreviewHtml(previewResult.data?.previewMD ?? '');
      }
      setIsPreviewMode.toggle();
    },
    [markdown, setIsPreviewMode]
  );
  const handleClickUpdate = useCallback(async () => {
    if (id == null) {
      return;
    }
    setIsLoading.on();
    const update: UpdateNoteForClientInput = { id, title, markdown };
    (await API.graphql(
      graphqlOperation(updateNoteForClient, { input: update })
    )) as GraphQLResult<UpdateNoteForClientMutation>;
    setIsLoading.off();
  }, [id, setIsLoading, title, markdown]);

  return (
    <ContentLayout
      header={
        <Header
          type="editor"
          isLoading={isLoading}
          onClickUpdate={handleClickUpdate}
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
            <HtmlView html={previewHtml} />
          ) : (
            <MDEditor value={markdown} onChange={handleMarkdownChange} />
          )}
        </Box>
      </Container>
    </ContentLayout>
  );
};
