// Imports
import React from 'react';
import { jwtDecode } from "jwt-decode";

// Next SSR Imports
import Link from 'next/link';
import { cookies } from 'next/headers';

// GraphQL Imports
import { getClient } from "@/lib/client";
import { GET_USER_BY_ID_QUERY } from '@/graphQL/querys';
import { CREATE_UPDATE_MUTATION } from '@/graphQL/mutations';


async function getUserData(id: String){
    
    const client = getClient();          

    const { data } = await client.query({
    query: GET_USER_BY_ID_QUERY,
    variables: {
        "userId": id,
    },
    });    

    return data.getUserById;
}

export default async function EditProfile() {

    const token = cookies().get('jwt');

    const decoded = jwtDecode(token.value);    

    const data = await getUserData(decoded.id);

    async function handleUpdate(formData: FormData){
        'use server'        
    
          const client = getClient();
    
          //TODO: Revisar porque el parametro description se devuelve como null
          const updateInput = {
            name: formData.get('name'),
            mail: formData.get('email'),
            career: formData.get('carrera'),
            //description: formData.get('description'),
            
          }          
    
          const { data } = await client.mutate({
            mutation: CREATE_UPDATE_MUTATION,
            variables: {
                "userId": decoded.id,
                updateInput,
            },
          });
    
          if (data){
            console.log("Update realizado con exito")
          }
          else{
            console.log("ERROR AL UPDATEAR USUARIO");
          }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden">
                <form className="flex" action={handleUpdate}>
                    {/* Columna de la izquierda: Foto del usuario */}
                    <div className="w-1/3 bg-gray-200 p-4">
                        <img src="https://raw.githubusercontent.com/gabrielcarvajalfigueroa/Tinder-Front/matches-view-development/app/ui/images/duendeLab.jpg" alt="User Avatar" className="w-full h-auto rounded-full" />
                    </div>
    
                    {/* Columna de la derecha: Campos editables */}
                    <div className="w-2/3 p-4">
                        <h1 className="text-2xl font-semibold mb-4">Editar Perfil</h1>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">Nombre:</label>
                            <input type="text" id="name" name="name" defaultValue={data.name} className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Correo electrónico:</label>
                            <input type="email" id="email" name="email" defaultValue={data.mail} className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="carrera" className="block text-gray-700">Carrera:</label>
                            <input type="text" id="carrera" name="carrera" defaultValue={data.career} className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700">Descripción:</label>                            
                            <textarea name="description" id="description" form="editProfileForm" defaultValue={data.description} className="mt-1 h-fit px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                        {/* Agrega más campos editables según sea necesario */}
                        <div className="flex justify-between">
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                Guardar Cambios
                            </button>
    
                            <Link href="/" className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                                Cancelar
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
    
}
