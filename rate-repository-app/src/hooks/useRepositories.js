import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const { data, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  useState(() => {
    if (data) setRepositories(data.data);
  }, [data]);

  const refetchRepositories = async (orderValue, filterValue) => {
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
    const response = await refetch({
      orderBy,
      orderDirection,
      searchKeyword: filterValue,
    });

    setLoading(false);
    setRepositories(response.data.repositories);
  };

  return { repositories, loading, refetch: refetchRepositories };
};

export default useRepositories;
