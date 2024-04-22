'use client'
import React, {useState, useMemo, useRef, useEffect} from 'react';
import TinderCard from 'react-tinder-card';
import { TiHeartFullOutline, TiRefresh, TiTimesOutline } from 'react-icons/ti';
import {gql, useMutation, useQuery} from '@apollo/client';

import '@/components/ui/css/tinderCards.css';
import '@/components/ui/css/swipeButton.css';
import {API, Direction} from "@/interfaces";

import {user} from "@nextui-org/react";
import invariant from "ts-invariant";
import error = invariant.error;

interface User {
    _id: string;
    name: string;
    password: string;
    mail: string;
    career: string;
    photo: string;
    year: string;
}
interface Props {
    userId: string;
    users: User[];
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
const LIKE_USER_MUTATION = gql`
    mutation LikeUser($userId: String!, $likedUserId: String!) {
  likeUser(userId: $userId, likedUserId: $likedUserId) {
    user1
    user2
  }
}

`;
const GET_MATCHES_MUTATION = gql`
   mutation GetMatch($loggedInUser: String!, $likedUser: String!) {
  getMatch(loggedInUser: $loggedInUser, likedUser: $likedUser) 
}
`;


const TinderCards: React.FC<Props> =  ({ userId, users}) => {
    //const filteredUsers : User[] = users?.filter(user => user._id !== userId);
    const db: User[] = users;


    const [currentIndex, setCurrentIndex] = useState<number>(db.length - 1 );
    const [lastDirection, setLastDirection] = useState<string | undefined>();
    // used for outOfFrame closure
    const currentIndexRef = useRef<number>(currentIndex);

    const childRefs: React.MutableRefObject<API>[] = useMemo(
        () =>
            Array(db.length)
                .fill(2)
                .map(() => React.createRef<API>() as React.MutableRefObject<API>), // Convertimos cada RefObject a MutableRefObject
        []
    );
    const updateCurrentIndex = (val: number) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };

    const canSwipe = currentIndex >= 0;

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
    const [likeUser] = useMutation(LIKE_USER_MUTATION, {
        onError: (error) => {
            console.error("Error liking user:", error);
        }
    });
    const [getMatch, { data: matchData }] = useMutation(GET_MATCHES_MUTATION, {
        onError: (error) => {
            console.error("Error getting match:", error);
        }
    });
    const swipe = async (dir: Direction, userId : string) => {
        if (canSwipe && currentIndex < db.length) {
            await childRefs[currentIndex].current?.swipe(dir);
            if (dir === 'left') {
                const likedUserId = db[currentIndex]._id;
                await likeUser({
                    variables: {
                        userId: userId,
                        likedUserId: likedUserId
                    }
                });
                // Check for match
                getMatch({
                    variables: { loggedInUser: userId, likedUser: likedUserId}
                }).then(response => {
                    console.log(response.data.getMatch, "response");
                    if (response.data.getMatch) {
                        alert("MATCH")
                        console.log("MATCH");
                    }
                    console.log("AQUI PASE");
                });

            } else {
                console.log("dislike");
            }
        }
    };

    return (
        <div>
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
                <button className='button heart' onClick={() => swipe('left', userId)}>
                    <TiHeartFullOutline/>
                </button>
                <button className='button times' onClick={() => swipe('right', userId)}>
                    <TiTimesOutline/>
                </button>
            </div>
        </div>
    );
};

export default TinderCards;
