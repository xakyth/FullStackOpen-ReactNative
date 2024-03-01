import { gql } from '@apollo/client';
import {
  REPOSITORY_CONNECTION_FIELDS,
  SINGLE_REPOSITORY_FIELDS,
} from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      ...REPOSITORY_CONNECTION_FIELDS
    }
  }
  ${REPOSITORY_CONNECTION_FIELDS}
`;

export const CURRENT_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY_BY_ID = gql`
  query getRepositoryById($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...SINGLE_REPOSITORY_FIELDS
    }
  }
  ${SINGLE_REPOSITORY_FIELDS}
`;
