import {
  GetNoteQuery,
  PreviewMDMutation,
  UpdateNoteInput,
  UpdateNoteMutation,
} from '@/API';
import { ContentLayout, Header } from '@/components/Layout';
import { previewMD, updateNote } from '@/graphql/mutations';
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
  const [content, setContent] = useState('');
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
      setContent(note?.content ?? '');
    };
    fetchNote();
  }, [id]);

  const handleTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) =>
      setTitle(event.target.value),
    []
  );
  const handleContentChange = useCallback(
    (value: string) => setContent(value),
    []
  );

  const handleChangeIsPreview = useCallback(
    async (isPreview: boolean) => {
      if (isPreview) {
        const previewResult = (await API.graphql(
          graphqlOperation(previewMD, { markdown: content })
        )) as GraphQLResult<PreviewMDMutation>;
        setPreviewHtml(previewResult.data?.previewMD ?? '');
      }
      setIsPreviewMode.toggle();
    },
    [content, setIsPreviewMode]
  );
  const handleClickUpdate = useCallback(async () => {
    if (id == null) {
      return;
    }
    setIsLoading.on();
    const update: UpdateNoteInput = { id, title, content };
    (await API.graphql(
      graphqlOperation(updateNote, { input: update })
    )) as GraphQLResult<UpdateNoteMutation>;
    setIsLoading.off();
  }, [id, setIsLoading, title, content]);

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
            <MDEditor value={content} onChange={handleContentChange} />
          )}
        </Box>
      </Container>
    </ContentLayout>
  );
};
