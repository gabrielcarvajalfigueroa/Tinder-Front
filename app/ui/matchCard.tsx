import React from 'react';

interface CardProps {
    username: string;
    description?: string;
    imageUrl?: string;
    career: string;
}

const MatchCard: React.FC<CardProps> = ({ username, description, imageUrl, career }) => {
    return (
        <>

            <div className="w-96 h-auto bg-teal-500 border border-gray-200 rounded-lg shadow dark:border-gray-700 text-center text-black">
                <div className={" flex justify-center mt-2"}>
                    {imageUrl && <img className="w-80 h-auto max-w-full rounded-lg" src={imageUrl} alt={username} />}
                </div>
                <div className="p-5">
                        <h1 className="mb-2 text-3xl font-bold tracking-tight">{username}</h1>
                    {career && <p className="mb-3 font-semibold text-lg text-teal-950">{career}</p>}

                </div>
            </div>
        </>
    );
};

export default MatchCard;
