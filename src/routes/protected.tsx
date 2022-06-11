import React from 'react';
import { lazyImport } from '@/utils/lazyImport';
import { Navigate } from 'react-router-dom';

const { Editor } = lazyImport(() => import('@/features/notes'), 'Editor');

export const protectedRoutes = [
  {
    path: '/note/:id/edit',
    element: <Editor />,
  },
  { path: '*', element: <Navigate to="." /> },
];
