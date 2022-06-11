// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import { Box, Center, Spinner } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { MainLayout } from './components/Layout';
import { AppProvider } from './providers/app';
import { AppRoutes } from './routes';

const App = () => (
  <AppProvider>
    <MainLayout>
      <Suspense
        fallback={
          <>
            <Box h={16} flexShrink={0} bg="white" shadow="xs" />
            <Center h="full" w="full">
              <Spinner size="xl" />
            </Center>
          </>
        }
      >
        <AppRoutes />
      </Suspense>
    </MainLayout>
  </AppProvider>
);

export default App;
