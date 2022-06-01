/** @jsxImportSource @emotion/react */
import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { MainLayout } from './components/Layout';
import { NoteCardProps } from './features/notes/components/NoteCard';
import { NoteCards } from './features/notes/components/NoteCards';
import { AppProvider } from './providers/app';

const Test = () => <p>This is Top</p>;
const Test2 = () => <p>Here is Hoge</p>;

const AppRoutes = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Test />,
    },
    {
      path: '/hoge',
      element: <Test2 />,
    },
  ];

  const routeElement = useRoutes(routes);
  return routeElement;
};

const notes: NoteCardProps[] = Array(8)
  .fill(null)
  .map((_, i) => ({
    title: '今日の料理の計画について',
    text: 'あ'.repeat(120 + i),
    favoriteCount: 12 + i,
    isFavorite: i % 2 === 0,
  }));

const App = () => (
  <AppProvider>
    <MainLayout>
      <AppRoutes />
      <NoteCards notes={notes} />
      {/* <Link to="hoge">Hoge</Link>
      <Link to="/">Top</Link> */}
    </MainLayout>
  </AppProvider>
);

export default App;
