import { gql } from '@apollo/client';

export const CREATE_LOGIN_MUTATION = gql`
  mutation LoginUser($loginInput: LoginUserInput!) {     
    loginUsersTest(loginInput: $loginInput )  
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation crearUsuario ($userInput: CreateUserInput!) {
    createUsers(userInput: $userInput )
  }
`;

export const CREATE_UPDATE_MUTATION = gql`
  mutation UpdateUsers($userId: String!, $updateInput: UpdateUserInput!){
    updateUser(userId: $userId, updateInput: $updateInput)
  }
`;