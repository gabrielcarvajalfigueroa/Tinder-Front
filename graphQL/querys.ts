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