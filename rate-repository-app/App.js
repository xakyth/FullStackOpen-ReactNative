import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import { StatusBar } from 'expo-status-bar';
import createApolloClient from './src/utils/apolloClient';
import { ApolloProvider } from '@apollo/client';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
            <StatusBar style='auto' />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
    </>
  );
};

export default App;
