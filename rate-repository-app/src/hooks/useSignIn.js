import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

export const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [authFunc, { data }] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const response = await authFunc({ variables: { username, password } });
    const token = response.data.authenticate.accessToken;
    await authStorage.setAccessToken(token);
    await apolloClient.resetStore();
    return response;
  };

  return [signIn, data];
};
