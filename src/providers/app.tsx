import { Authenticator } from '@aws-amplify/ui-react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FavoriteIdsProvider } from './favoriteIds';

type AppProviderProps = {
  children: React.ReactNode;
};

const font =
  'Helvetica, "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Noto Sans JP", Arial, Meiryo, sans-serif';
const theme = extendTheme({
  fonts: {
    heading: font,
    body: font,
  },
  lineHeights: {
    base: 1.4,
    taller: 1.8,
  },
  textStyles: {
    h1: {
      fontSize: '2rem',
      fontWeight: 'bold',
      lineHeight: 'short',
    },
  },
  colors: {
    base: {
      500: '#ececec',
    },
    primary: {
      300: '#2c689f',
      500: '#1e5282',
      700: '#0b3964',
      900: '#061f35',
    },
    accent: {
      500: '#ffa800',
      600: '#f09e00',
    },
    favorite: {
      500: '#ff5b5b',
    },
  },
});

export const AppProvider = ({ children }: AppProviderProps) => (
  <ChakraProvider theme={theme}>
    <Authenticator.Provider>
      <FavoriteIdsProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </FavoriteIdsProvider>
    </Authenticator.Provider>
  </ChakraProvider>
);
