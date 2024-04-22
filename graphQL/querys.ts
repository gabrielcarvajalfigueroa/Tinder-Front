import { gql } from '@apollo/client';

export const GET_USER_BY_ID_QUERY = gql`
  query getUserById($userId: String!) {
      getUserById(userId: $userId) {
        name
        mail
        career
        description
        photo
        year
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
      likes
    }
  }
`;

export const MATCHES_QUERY = gql`
  query MatchesQuery($userId: String!) {
    getUserMatches(userId: $userId) 
  }
`;
