import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';

export const useSignIn = () => {
  const [authFunc, { data }] = useMutation(AUTHENTICATE);

  return [
    ({ username, password }) => authFunc({ variables: { username, password } }),
    data,
  ];
};
