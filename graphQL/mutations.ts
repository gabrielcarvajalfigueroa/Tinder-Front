import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($userInput: CreateUserInput!) {
    createUsers(userInput: $userInput)
  }
`;

export const loginMutation = gql`
  mutation LoginUser($loginInput: LoginUserInput!) {
    loginUsersTest(loginInput: $loginInput){
        name,
        email,
        password
  }
 }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($userId: String!, $updateInput: UpdateUserInput!) {
    updateUser(userId: $userId, updateInput: $updateInput){
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($userId: String!) {
    deleteUser(userId: $userId)
  }
`;

export const CREATE_MATCH_MUTATION = gql`
  mutation CreateMatch($createMatchDto: CreateMatchDto!) {
    createMatch(createMatchDto: $createMatchDto) {
      // Aquí incluye los campos que necesites de la respuesta del servidor
    }
  }
`;
