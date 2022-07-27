import { lazyImport } from '@/utils/lazyImport';

const { Editor } = lazyImport(() => import('@/features/notes'), 'Editor');

// ログイン時のみ遷移可能なroute
export const protectedRoutes = [
  {
    path: '/note/:id/edit',
    element: <Editor />,
  },
];
