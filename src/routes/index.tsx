import { useAuthenticator } from '@aws-amplify/ui-react';
import { useRoutes } from 'react-router-dom';
import { commonRoutes } from './common';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const { route } = useAuthenticator((context) => [context.route]);

  const routes = route === 'authenticated' ? protectedRoutes : publicRoutes;

  const element = useRoutes([...commonRoutes, ...routes]);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{element}</>;
};
