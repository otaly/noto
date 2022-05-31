/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link, RouteObject, useRoutes } from 'react-router-dom';
import { MainLayout } from './components/Layout';
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

const App = () => (
  <AppProvider>
    <MainLayout>
      <AppRoutes />
      <Link to="hoge">Hoge</Link>
      <Link to="/">Top</Link>
    </MainLayout>
  </AppProvider>
);

export default App;
