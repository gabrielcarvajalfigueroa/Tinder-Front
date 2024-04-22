"use client"
import React, { useState } from 'react';
import { User } from "@/interfaces";

interface CardProps {
    username?: string;
    description?: string;
    imageUrl?: string;
    career?: string;
    userId?: string;
    db?: User[];
}

const ProfileCard: React.FC<CardProps> = ({ userId, db}) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const nextUser = () => {
        if (db && currentIndex < db.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevUser = () => {
        if (db && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="flex flex-col items-center mt-9 h-screen">
            <h1 className="text-4xl font-bold">LISTA DE MATCHES</h1>

            {db && db.length > 0 ? (
                <div key={db[currentIndex]._id} className="w-80 bg-teal-400 border border-gray-200 rounded-lg shadow dark:border-gray-700 text-center text-black">
                    <a href="#" className={" flex justify-center mt-2"}>
                        {db[currentIndex].photo && <img className="w-56 h-auto max-w-full rounded-lg" src={db[currentIndex].photo} alt={db[currentIndex].name} />}
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h1 className="mb-2 text-3xl font-bold tracking-tight">{db[currentIndex].name}</h1>
                        </a>
                        {db[currentIndex].career && <p className="mb-3 font-semibold text-lg text-blue-600">{db[currentIndex].career}</p>}
                        {db[currentIndex].year && <p className="mb-3 font-normal">{db[currentIndex].year}</p>}
                    </div>
                    <div className="p-4 space-x-4">
                        <button onClick={prevUser} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Anterior</button>
                        <button onClick={nextUser} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Siguiente</button>
                    </div>

                </div>
            ) : (
                <h1>No tienes matches</h1>
            )}
        </div>
    );
};

export default ProfileCard;
