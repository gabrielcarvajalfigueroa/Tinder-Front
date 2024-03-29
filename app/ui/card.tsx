import React from 'react';

interface CardProps {
    title: string;
    description: string;
    imageUrl?: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
            <a href="#">
                {imageUrl && <img className="rounded-t-lg w-full h-auto" src={imageUrl} alt={title} />}
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
            </div>
        </div>
    );
};

export default Card;
