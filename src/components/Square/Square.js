import React from 'react';
import './Square.css';
import { useSelector } from 'react-redux';

const Square = ({ square }) => {
    let blockStyle = '';

    const snake = useSelector((store) => store.game.snake);
    const apple = useSelector((store) => store.game.apple);
    const { x, y } = square;

    // Проверка для отображения змейки
    for (let s of snake) {
        if (s.x === x && s.y === y) {
            blockStyle = 'snake';
            break;
        }
    }

    // Проверка для отображения яблока
    if (x === apple.x && y === apple.y) blockStyle = 'apple';

    return (
        <div className={`Square ${blockStyle}`}></div>
    );
};

export default Square;
