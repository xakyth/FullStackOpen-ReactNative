import { gql } from '@apollo/client';
import {
  REPOSITORY_CONNECTION_FIELDS,
  REVIEW_FIELDS,
  SINGLE_REPOSITORY_FIELDS,
} from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      ...REPOSITORY_CONNECTION_FIELDS
    }
  }
  ${REPOSITORY_CONNECTION_FIELDS}
`;

export const CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        ...REVIEW_FIELDS
      }
    }
  }
  ${REVIEW_FIELDS}
`;

export const GET_REPOSITORY_BY_ID = gql`
  query getRepositoryById($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...SINGLE_REPOSITORY_FIELDS
    }
  }
  ${SINGLE_REPOSITORY_FIELDS}
`;
