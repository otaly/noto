/** @jsxImportSource @emotion/react */
import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { MainLayout } from './components/Layout';
import { Favorites } from './features/notes/routes/Favorites';
import { Home } from './features/notes/routes/Home';
import { MyNotes } from './features/notes/routes/MyNotes';
import { AppProvider } from './providers/app';

const AppRoutes = () => {
  const routes: RouteObject[] = [
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
  ];

  const routeElement = useRoutes(routes);
  return routeElement;
};

const App = () => (
  <AppProvider>
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  </AppProvider>
);

export default App;
