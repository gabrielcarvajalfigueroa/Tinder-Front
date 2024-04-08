import React, { useRef, useState } from 'react';

declare type Direction = 'left' | 'right' | 'up' | 'down';
declare type SwipeHandler = (direction: Direction) => void;
declare type CardLeftScreenHandler = (direction: Direction) => void;
declare type SwipeRequirementFulfilledUpdate = (direction: Direction) => void;
declare type SwipeRequirementUnfulfilledUpdate = () => void;

interface API {
    swipe(dir?: Direction): Promise<void>;
    restoreCard(): Promise<void>;
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

const TinderCard: React.FC<Props> = ({
                                         flickOnSwipe = true,
                                         onSwipe,
                                         onCardLeftScreen,
                                         preventSwipe = [],
                                         swipeRequirementType = 'velocity',
                                         swipeThreshold = 300,
                                         onSwipeRequirementFulfilled,
                                         onSwipeRequirementUnfulfilled,
                                         className,
                                         children
                                     }) => {
    const ref = useRef<API>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const swiped = (direction: Direction, nameToDelete: string, index: number): void => {
        setCurrentIndex(index - 1);
        onSwipe && onSwipe(direction);
    };

    const outOfFrame = (name: string, idx: number, direction: Direction): void => {
        onCardLeftScreen && onCardLeftScreen(direction);
    };

    const swipe = async (dir: Direction): Promise<void> => {
        if (ref.current) {
            await ref.current.swipe(dir);
        }
    };

    return (
        <div className={className}>
            {React.Children.map(children, (child, index) => (
                    <div key={index} className="tinder-card">
                {React.cloneElement(child as React.ReactElement, {
                        ref,
                        flickOnSwipe,
                        onSwipe: (dir: Direction) => swiped(dir, '', index),
                        onCardLeftScreen: (dir: Direction) => outOfFrame('', index, dir),
                        preventSwipe,
                        swipeRequirementType,
                        swipeThreshold,
                        onSwipeRequirementFulfilled,
                        onSwipeRequirementUnfulfilled
                    })}
                </div>
    ))}
    </div>
);
};

export default TinderCard;
