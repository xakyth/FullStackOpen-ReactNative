import { gql } from '@apollo/client';
import { REPOSITORY_CONNECTION_FIELDS, REPOSITORY_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories {
    repositories {
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
      ...REPOSITORY_FIELDS
    }
  }
  ${REPOSITORY_FIELDS}
`;
