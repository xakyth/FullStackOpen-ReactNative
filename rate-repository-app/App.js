import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import { StatusBar } from 'expo-status-bar';
import createApolloClient from './src/utils/apolloClient';
import { ApolloProvider } from '@apollo/client';

const apolloClient = createApolloClient();

const App = () => {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
          <StatusBar style='auto' />
        </ApolloProvider>
      </NativeRouter>
    </>
  );
};

export default App;
