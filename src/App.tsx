import '@aws-amplify/ui-react/styles.css';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { Suspense } from 'react';
import { MainLayout } from './components/Layout';
import { AppProvider } from './providers/app';
import { AppRoutes } from './routes';

const App = () => (
  <AppProvider>
    <MainLayout>
      <Suspense
        fallback={
          <>
            {/* ダミーのヘッダー */}
            <Box h={16} flexShrink={0} bg="white" shadow="xs" />
            <Center h="full" w="full">
              <Spinner size="xl" thickness="4px" color="blue.400" />
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
