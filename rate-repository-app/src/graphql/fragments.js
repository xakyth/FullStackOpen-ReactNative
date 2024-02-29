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

export const SINGLE_REPOSITORY_FIELDS = gql`
  fragment SINGLE_REPOSITORY_FIELDS on Repository {
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
    reviews {
      edges {
        cursor
        node {
          createdAt
          id
          rating
          text
          user {
            id
            username
          }
        }
      }
    }
  }
`;
