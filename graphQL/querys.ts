import { gql } from '@apollo/client';

export const GET_USERS_QUERY = gql`
  query GetUsers {
    user {
      // Aquí incluye los campos que necesites de los usuarios
    }
  }
`;

export const GET_USER_BY_ID_QUERY = gql`
  query GetUserById($userId: String!) {
    getUserById(userId: $userId) {
      // Aquí incluye los campos que necesites del usuario
    }
  }
`;

export const SHOW_INFO_QUERY = gql`
  query ShowInfo {
    showInfo
  }
`;

export const GET_MATCHES_QUERY = gql`
  query GetMatches {
    matches {
      // Aquí incluye los campos que necesites de los matches
    }
  }
`;
