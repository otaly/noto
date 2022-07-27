import { useAuthenticator } from '@aws-amplify/ui-react';
import { Center, Spinner } from '@chakra-ui/react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { commonRoutes } from './common';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const { route } = useAuthenticator((context) => [context.route]);

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
  switch (route) {
    case 'idle':
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
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{element}</>;
};
