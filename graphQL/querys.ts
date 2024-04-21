import { gql } from '@apollo/client';

export const GET_USER_BY_ID_QUERY = gql`
  query getUserById($userId: String!) {
      getUserById(userId: $userId) {
        name
        mail
        career
        description
      }
    }
`;

export const USERS_QUERY = gql`
  query {
    user {
      _id
      name
      mail
      career
      photo
      year
    }
  }
`;

