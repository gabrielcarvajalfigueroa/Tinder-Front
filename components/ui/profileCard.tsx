"use client"
import React, { useState } from 'react';
import { gql, useQuery } from "@apollo/client";
import { User } from "@/interfaces";

interface CardProps {
    username: string;
    description?: string;
    imageUrl?: string;
    career: string;
    userId: string;
}

const USER_QUERY = gql`
  query {
    user {
      _id
      name
      mail
      career
      photo
      year
    }
  }
`;

const ProfileCard: React.FC<CardProps> = ({ userId }) => {
    const { data, loading } = useQuery(USER_QUERY);
    const filteredUsers = data?.user?.filter(user => user._id !== userId);
    const db: User[] = filteredUsers || [];

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const nextUser = () => {
        if (currentIndex < db.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevUser = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="flex flex-col items-center mt-20 h-screen">
            <h1 className="text-4xl font-boldt">LISTA DE MATCHES</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
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
            )}
        </div>
    );
};

export default ProfileCard;
