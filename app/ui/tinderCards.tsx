import React, { useState, useMemo, useRef } from 'react';
import TinderCard from "react-tinder-card";
import { TiHeartFullOutline, TiRefresh, TiTimesOutline } from "react-icons/ti";
import "./css/tinderCards.css";
import "./css/swipeButton.css";

type Direction = 'left' | 'right' | 'up' | 'down';
type SwipeHandler = (direction: Direction) => void;
type CardLeftScreenHandler = (direction: Direction) => void;
type SwipeRequirementFulfilledUpdate = (direction: Direction) => void;
type SwipeRequirementUnfulfilledUpdate = () => void;

interface API {
    swipe(dir?: Direction): Promise<void>;
    restoreCard(): Promise<void>;
}

interface Person {
    name: string;
    url: string;
    career: string;
    year: string;
}

interface Props {
    flickOnSwipe?: boolean;
    onSwipe?: SwipeHandler;
    onCardLeftScreen?: CardLeftScreenHandler;
    preventSwipe?: Direction[];
    swipeRequirementType?: 'velocity' | 'position';
    swipeThreshold?: number;
    onSwipeRequirementFulfilled?: SwipeRequirementFulfilledUpdate;
    onSwipeRequirementUnfulfilled?: SwipeRequirementUnfulfilledUpdate;
    className?: string;
    children?: React.ReactNode;
}

const TinderCards: React.FC = () => {
    const [peoples, setPeople] = useState<Person[]>([
        {
            name: "Duende Lab",
            url: "https://i.pinimg.com/564x/36/7e/93/367e9326f9f9c529951360c1d75c93bf.jpg",
            career: "INGECO",
            year: "6to año",
        },
        {
            name: "Jeff",
            url: "https://www.mendoza.gov.ar/wp-content/uploads/sites/49/2023/03/peque-2-rotated.jpeg",
            career: "ICCI",
            year: "4to año",
        }
    ]);

    const [currentIndex, setCurrentIndex] = useState<number>(peoples.length - 1);
    const [lastDirection, setLastDirection] = useState<Direction | undefined>();
    const currentIndexRef = useRef<number>(currentIndex);
    const canSwipe: boolean = currentIndex >= 0;
    const canGoBack = currentIndex < peoples.length - 1;

    const childRefs: React.MutableRefObject<API | null>[] = useMemo(
        () =>
            Array(peoples.length)
                .fill(0)
                .map(() => React.createRef<API | null>()),
        []
    );

    const updateCurrentIndex = (val: number): void => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };

    const swiped = (direction: Direction, nameToDelete: string, index: number): void => {
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
        if (canSwipe && currentIndex < peoples.length) {
            await childRefs[currentIndex].current?.swipe(dir);
        }
    };
    const goBack = async () => {
        if (!canGoBack) return
        const newIndex = currentIndex + 1
        updateCurrentIndex(newIndex)
        await childRefs[newIndex].current?.restoreCard()
    }

    return (
        <div>
            <div className="tinderCard_container">
                {peoples.map((person, index) => (
                    <TinderCard
                        key={index}
                        className={'swipe'}
                        flickOnSwipe={false}
                        onSwipe={(dir) => swiped(dir, person.name, index)}
                        onCardLeftScreen={() => outOfFrame(person.name, index)}
                        preventSwipe={['up', 'down']}
                        ref={childRefs[index]}
                    >
                        <div
                            className="card"
                            style={{
                                backgroundImage: `url(${person.url})`,
                            }}
                        >
                            <div className="card_content">
                                <div className="info_background">
                                    <h3 style={{ color: "black" }}>{person.name}</h3>
                                    <p>Carrera: {person.career}</p>
                                    <p>Año de carrera: {person.year}</p>
                                </div>
                            </div>
                        </div>
                    </TinderCard>
                ))}
            </div>
            <div className="swipeButton">
                <button className="button heart" onClick={() => swipe('left')}>
                    <TiHeartFullOutline />
                </button>
                <button className="button refresh" onClick={() => goBack()}>
                    <TiRefresh />
                </button>
                <button className="button times" onClick={() => swipe('right')}>
                    <TiTimesOutline />
                </button>
            </div>
        </div>
    );
}

export default TinderCards;
