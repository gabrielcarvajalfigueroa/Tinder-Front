'use client'
import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import { TiHeartFullOutline, TiRefresh, TiTimesOutline } from 'react-icons/ti';
import { gql, useQuery } from '@apollo/client';

import '@/components/ui/css/tinderCards.css';
import '@/components/ui/css/swipeButton.css';
import {API, Direction, Props} from "@/interfaces";

import {user} from "@nextui-org/react";

interface User {
    _id: string;
    name: string;
    password: string;
    mail: string;
    career: string;
    photo: string;
    year: string;
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


const TinderCards: React.FC<Props> =  ({ userId }) => {
    const { data, loading } = useQuery(USER_QUERY);
    const filteredUsers = data?.user?.filter(user => user._id !== userId);
    let db: User[] = filteredUsers || [];



    console.log(db, "este es el db");

    const [currentIndex, setCurrentIndex] = useState<number>(db.length - 1 || 0);
    const [lastDirection, setLastDirection] = useState<string | undefined>();
    // used for outOfFrame closure
    const currentIndexRef = useRef<number>(currentIndex);

    const childRefs: React.MutableRefObject<API >= useMemo(
        () =>
            Array(db.length)
                .fill(2)
                .map(() => React.createRef<API >()),
        []
    );

    const updateCurrentIndex = (val: number) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };

    const canGoBack = currentIndex < db.length - 1

    const canSwipe = currentIndex >= 1;

    // set last direction and decrease current index

    const swiped = (direction: string, nameToDelete: string, index: number) => {
        setLastDirection(direction);
        updateCurrentIndex(index - 1);
    };

    const outOfFrame = (name: string, idx: number): void => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
        if (currentIndexRef.current >= idx && childRefs[idx].current) {
            childRefs[idx].current?.restoreCard();
        }
    };

    const swipe = async (dir: Direction): Promise<void> => {
        if (canSwipe && currentIndex < db.length) {
            await childRefs[currentIndex].current?.swipe(dir);
        }
    };

    if (loading) {
        return <div>loading.....</div>;
    }

    return (
        <div>
            <link
                href='https://fonts.googleapis.com/css?family=Damion&display=swap'
                rel='stylesheet'
            />
            <link
                href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
                rel='stylesheet'
            />
            <div className='tinderCard_container'>
                {db
                    .map((character, index) => (
                    <TinderCard
                        className='swipe'
                        key={character.name}
                        flickOnSwipe={false}
                        onSwipe={(dir) => swiped(dir, character.name, index)}
                        onCardLeftScreen={() => outOfFrame(character.name, index)}
                        preventSwipe={['up', 'down']}
                        ref={childRefs[index]}
                    >
                        <div
                            className='card'
                            style={{
                                backgroundImage: `url(${character.photo})`,
                            }}
                        >
                            <div className='card_content'>
                                <div className='info_background'>
                                    <h3 style={{ color: 'black' }}>{character.name}</h3>
                                    <p>Carrera: {character.career}</p>
                                    <p>Año de carrera: {character.year}</p>
                                </div>
                            </div>
                        </div>
                    </TinderCard>
                ))}
            </div>
            <div className='swipeButton'>
                <button className='button heart' onClick={() => swipe('left')}>
                    <TiHeartFullOutline />
                </button>
                <button className='button times' onClick={() => swipe('right')}>
                    <TiTimesOutline />
                </button>
            </div>
        </div>
    );
};

export default TinderCards;
