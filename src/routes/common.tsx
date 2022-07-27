import { lazyImport } from '@/utils/lazyImport';
import { Navigate, RouteObject } from 'react-router-dom';

const { Home } = lazyImport(() => import('@/features/notes'), 'Home');
const { MyNotes } = lazyImport(() => import('@/features/notes'), 'MyNotes');
const { Favorites } = lazyImport(() => import('@/features/notes'), 'Favorites');
const { Note } = lazyImport(() => import('@/features/notes'), 'Note');

// 未ログイン、ログインに関わらず遷移可能なroute
export const commonRoutes: RouteObject[] = [
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
  { path: '*', element: <Navigate to="/" /> },
];
