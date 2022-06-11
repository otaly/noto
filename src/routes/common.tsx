import { lazyImport } from '@/utils/lazyImport';

const { Home } = lazyImport(() => import('@/features/notes'), 'Home');
const { MyNotes } = lazyImport(() => import('@/features/notes'), 'MyNotes');
const { Favorites } = lazyImport(() => import('@/features/notes'), 'Favorites');
const { Note } = lazyImport(() => import('@/features/notes'), 'Note');

export const commonRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/mynotes',
    element: <MyNotes />,
  },
  {
    path: '/favorites',
    element: <Favorites />,
  },
  {
    path: '/note/:id',
    element: <Note />,
  },
];
