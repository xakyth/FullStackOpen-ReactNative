import { useLazyQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const [getRepositories] = useLazyQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  const fetchRepositories = async (orderValue) => {
    let orderBy = 'CREATED_AT';
    let orderDirection = 'DESC';
    switch (orderValue) {
      case 'latestReview':
        orderBy = 'CREATED_AT';
        orderDirection = 'DESC';
        break;
      case 'highestReview':
        orderBy = 'RATING_AVERAGE';
        orderDirection = 'DESC';
        break;
      case 'lowestReview':
        orderBy = 'RATING_AVERAGE';
        orderDirection = 'ASC';
        break;
      default:
        break;
    }
    setLoading(true);

    const response = await getRepositories({
      variables: { orderBy, orderDirection },
    });

    setLoading(false);
    setRepositories(response.data.repositories);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
