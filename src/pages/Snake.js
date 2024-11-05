import React from 'react';
import Board from '../components/Board/Board';
import Status from '../components/Status';
import '../App.css'
import { useDispatch } from 'react-redux';
import { saveKey } from '../redux/store/SnakeSLice';

const Snake = () => {
    const dispatch = useDispatch()
    const  keyDownHandler = (event) => {
        dispatch(saveKey(event.key))
    }
    
    return (
        <div className='App' onKeyDownCapture={keyDownHandler} tabIndex="0">
            <Status/>
            <Board/>
        </div>
    );
};

export default Snake;