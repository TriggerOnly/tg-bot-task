import React from 'react';
import './Square.css';
import { useSelector } from 'react-redux';

const Square = ({ square }) => {
    let blockStyle = '';
    const snake = useSelector(store => store.snake.snake);
    const apple = useSelector(store => store.apple?.apple);
    const { x, y } = square;

    for (let s of snake) {
        if (s.x === x && s.y === y) {
            blockStyle = 'snake';
        }
    }

    if (apple && x === apple.x && y === apple.y) {
        blockStyle = 'apple';
    }

    return (
        <div className={`Square ${blockStyle}`}></div>
    );
};

export default Square;
