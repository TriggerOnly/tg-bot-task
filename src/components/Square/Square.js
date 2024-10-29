import React from 'react';
import './Square.css'
import { useSelector } from 'react-redux';

const Square = ({square}) => {
    let buttonStyle = ' '

    const snake = useSelector(store => store.game.snake)
    const apple = useSelector(store => store.game.apple)
    const {x, y} = square   

    for(let s of snake) {
        if(s.x === x && s.y === y) buttonStyle = 'snake'
    }   

    if(x === apple.x && y === apple.y) buttonStyle = 'apple'

    return (
        <span className='Square'>
            <button className={buttonStyle}>
                
            </button>
        </span>
    );
};

export default Square;