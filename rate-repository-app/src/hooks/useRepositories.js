import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const [repositories, setRepositories] = useState();

  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  useState(() => {
    if (data) setRepositories(data.data);
  }, [data]);

  const refetchRepositories = async () => {
    const response = await refetch(variables);
    setRepositories(response.data.repositories);
  };

  return { repositories, loading, refetch: refetchRepositories };
};

export default useRepositories;
