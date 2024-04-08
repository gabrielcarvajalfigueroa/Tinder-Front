import React from 'react';

export default function EditProfile() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex">
                    {/* Columna de la izquierda: Foto del usuario */}
                    <div className="w-1/3 bg-gray-200 p-4">
                        <img src="https://raw.githubusercontent.com/gabrielcarvajalfigueroa/Tinder-Front/matches-view-development/app/ui/images/duendeLab.jpg" alt="User Avatar" className="w-full h-auto rounded-full" />
                    </div>

                    {/* Columna de la derecha: Campos editables */}
                    <div className="w-2/3 p-4">
                        <h1 className="text-2xl font-semibold mb-4">Editar Perfil</h1>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">Nombre:</label>
                            <input type="text" id="name" name="name" className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Correo electrónico:</label>
                            <input type="email" id="email" name="email" className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="carrera" className="block text-gray-700">Carrera:</label>
                            <input type="text" id="carrera" name="carrera" className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700">Descripcion:</label>                            
                            <textarea className="mt-1 h-fit px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" name="comment" form="usrform"></textarea>
                        </div>
                        {/* Agrega más campos editables según sea necesario */}
                    </div>
                </div>
            </div>
        </div>
    );
}
