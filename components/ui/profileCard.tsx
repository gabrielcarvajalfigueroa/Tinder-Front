import React from 'react';

interface CardProps {
    username: string;
    description?: string;
    imageUrl?: string;
    career: string;
}

const ProfileCard: React.FC<CardProps> = ({ username, description, imageUrl, career }) => {
    return (
        <div className="w-80 bg-teal-400 border border-gray-200 rounded-lg shadow dark:border-gray-700 text-center text-black">
            <a href="#" className={" flex justify-center mt-2"}>
                {imageUrl && <img className="w-56 h-auto max-w-full rounded-lg" src={imageUrl} alt={username} />}
            </a>
            <div className="p-5">
                <a href="#">
                    <h1 className="mb-2 text-3xl font-bold tracking-tight">{username}</h1>
                </a>
                {career && <p className="mb-3 font-semibold text-lg text-blue-600">{career}</p>}
                {description && <p className="mb-3 font-normal">{description}</p>}
            </div>
        </div>
);
};

export default ProfileCard;
