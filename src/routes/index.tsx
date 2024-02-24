import { useAuthenticator } from '@aws-amplify/ui-react';
import { Center, Spinner } from '@chakra-ui/react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { commonRoutes } from './common';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  const idleRoutes: RouteObject[] = [
    {
      path: '*',
      element: (
        <Center>
          <Spinner />
        </Center>
      ),
    },
  ];

  let routes: RouteObject[] = [];
  switch (authStatus) {
    case 'configuring':
      routes = idleRoutes;
      break;
    case 'authenticated':
      routes = protectedRoutes;
      break;
    default:
      routes = publicRoutes;
      break;
  }

  const element = useRoutes([...routes, ...commonRoutes]);
  return <>{element}</>;
};
