import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Square from '../Square/Square';
import { saveKey, setDirection } from '../../store/SnakeSLice';
import './Board.css';

const Board = () => {
    const dispatch = useDispatch();
    const direction = useSelector(store => store.snake.direction); 
    const stopKeyCombinations = useSelector(store => store.snake.stopKeyCombinations); 
    const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
    const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

    const handleSwipeDirection = () => {
        const diffX = touchEnd.x - touchStart.x;
        const diffY = touchEnd.y - touchStart.y;
        let newDirection;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            newDirection = diffX > 0 ? 'd' : 'a';
        } else {
            newDirection = diffY > 0 ? 's' : 'w';
        }

        if (!stopKeyCombinations.some(([a, b]) => (a === direction && b === newDirection) || (b === direction && a === newDirection))) {
            dispatch(saveKey(newDirection));
            dispatch(setDirection());
        }
    };

    const handleTouchStart = (e) => {
        setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    const handleTouchMove = (e) => {
        setTouchEnd({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        e.preventDefault();
    };

    const handleTouchEnd = () => {
        handleSwipeDirection();
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            let newDirection;

            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                    newDirection = 'w';
                    break;
                case 'ArrowDown':
                case 's':
                    newDirection = 's';
                    break;
                case 'ArrowLeft':
                case 'a':
                    newDirection = 'a';
                    break;
                case 'ArrowRight':
                case 'd':
                    newDirection = 'd';
                    break;
                default:
                    return;
            }

            if (!stopKeyCombinations.some(([a, b]) => (a === direction && b === newDirection) || (b === direction && a === newDirection))) {
                dispatch(saveKey(newDirection));
                dispatch(setDirection());
            }
            e.preventDefault();
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [dispatch, direction, stopKeyCombinations]);

    const squares = [];
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
            squares.push({ x, y, index: `${x}-${y}` });
        }
    }

    return (
        <div
            className="Board"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {squares.map((square) => (
                <Square key={square.index} square={square} />
            ))}
        </div>
    );
};

export default Board
