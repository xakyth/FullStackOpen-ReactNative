import { gql } from '@apollo/client';

export const REPOSITORY_CONNECTION_FIELDS = gql`
  fragment REPOSITORY_CONNECTION_FIELDS on RepositoryConnection {
    edges {
      node {
        description
        forksCount
        fullName
        id
        language
        ownerAvatarUrl
        ratingAverage
        reviewCount
        stargazersCount
      }
    }
  }
`;
