import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const [repositories, setRepositories] = useState([]);

  const { data, loading, refetch, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  useState(() => {
    if (data) {
      setRepositories(data.repositories.edges.map((edge) => edge.node));
    }
  }, [data]);

  const handleFetchMore = async () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) return;

    const response = await fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
    setRepositories(
      repositories.concat(
        response.data.repositories.edges.map((edge) => edge.node)
      )
    );
  };

  const refetchRepositories = async () => {
    const response = await refetch(variables);
    setRepositories(response.data.repositories.edges.map((edge) => edge.node));
  };

  return {
    repositories,
    loading,
    refetch: refetchRepositories,
    fetchMore: handleFetchMore,
  };
};

export default useRepositories;
