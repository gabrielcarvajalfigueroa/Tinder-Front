// UI Imports
import { Card } from "./ui/card";

// Next SSR Imports
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

// GraphQL Imports
import { getClient } from "@/lib/client";
import { CREATE_LOGIN_MUTATION } from "@/graphQL/mutations";


export default function LoginModal() {    
    
    async function handleLogin(formData: FormData){
      'use server'        
        
        const client = getClient();
  
        const loginInput = {          
          mail: formData.get('email'),
          password: formData.get('password'),
        }          
  
        const { data } = await client.mutate({
          mutation: CREATE_LOGIN_MUTATION,
          variables: {
              loginInput,
          },
        });          

        if (data){          

          cookies().set('jwt', data.loginUsersTest);

          redirect('/tinder_ucn');
        }
        else{
          console.log("ERROR AL LOGEAR USUARIO");
        }      
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-opacity-50">
      <Card className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <form className="mt-4 px-8 py-6" action={handleLogin}>
          <h1 className="text-2xl font-bold mb-4">Inicia Sesión</h1>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Correo electrónico:</label>
            <input type="email" id="email" name="email" className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Contraseña:</label>
            <input type="password" id="password" name="password" className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
          </div>

          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Iniciar Sesión
            </button>

            {/* Navigates back to the base URL - closing the modal */}
            <Link href="/" className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
              Cerrar
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
