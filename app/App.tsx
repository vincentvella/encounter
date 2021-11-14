import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import Navigator from './services/navigation/navigator';
import client from './services/client';
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot } from 'recoil';
import { ToastProvider } from 'react-native-toast-notifications';
import { StyleShim } from './services/web/style-shim';

// TODO: https://github.com/WICG/focus-visible

const App = () => {
  return (
    <>
      <StyleShim />
      <ToastProvider>
        <ApolloProvider client={client}>
          <StatusBar style="auto" />
          <RecoilRoot>
            <Navigator />
          </RecoilRoot>
        </ApolloProvider>
      </ToastProvider>
    </>
  );
}

export default App
