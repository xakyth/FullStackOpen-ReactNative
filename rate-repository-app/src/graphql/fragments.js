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

export const REPOSITORY_FIELDS = gql`
  fragment REPOSITORY_FIELDS on Repository {
    description
    forksCount
    fullName
    id
    language
    ownerAvatarUrl
    ratingAverage
    reviewCount
    stargazersCount
    url
  }
`;
