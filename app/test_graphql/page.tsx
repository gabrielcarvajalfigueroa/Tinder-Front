// here is a server component called UserProfile and here we want to get the user data

import { gql } from "@apollo/client";
import { getClient } from "@/lib/client";
import { cookies } from "next/headers";



const CREATE_USER_MUTATION = gql`
  mutation crearUsuario ($userInput: CreateUserInput!) {
    createUsers(userInput: $userInput )
  }
`;


export default async function UserPage() {
  const client = getClient();
  //const ourCookies = cookies();

  const userInput = {
    name: 'tulio',
    mail: 'tulio@gmail.com',
    password: 'tulioclave',
  }

  const { data } = await client.mutate({
    mutation: CREATE_USER_MUTATION,
    variables: {
        userInput,
    },
  });

  console.log("🚀 ~ user ~ data:", data);
  
  return (
    <>
      <h1>ojooo</h1>
  
    </>
  );
};