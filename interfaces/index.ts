import React from "react";

export interface User {
    _id?: number;
    name: string;
    photo: string;
    career: string;
    year: string;
    Email?: string;
    Password?: string;
    Token?: string;
}

export interface API {
    swipe(dir?: Direction): Promise<void>;
    restoreCard(): Promise<void>;
}
export type Direction = 'left' | 'right' | 'up' | 'down';
export type SwipeHandler = (direction: Direction) => void;
export type CardLeftScreenHandler = (direction: Direction) => void;
export type SwipeRequirementFulfilledUpdate = (direction: Direction) => void;
export type SwipeRequirementUnfulfilledUpdate = () => void;

export interface Props {
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
    userId: string;

}
