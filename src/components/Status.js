import React from 'react';
import { changeStatus, moveSnake, setDirection, checkApple, checkGameOver } from '../store/gameSlice';
import {useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../App.css'

const Status = () => {
    const dispatch = useDispatch()
    const status = useSelector(store => store.game.status)

    let timer = useRef(null)
    const update = () => {
      dispatch(moveSnake())
      dispatch(setDirection())
      dispatch(checkApple())
      dispatch(checkGameOver())
    }
    const startTimer = () => timer.current = setInterval(() => update(), 200);
    const stopTimer = () => clearInterval(timer.current)
  
    const clickHandler = () => {
        if (status === "Restart") {
            window.location.reload()
            return
        }
        if(status !== 'Pause') startTimer()
        else stopTimer()
      
        dispatch(changeStatus())
    }

    return (
        <div className='Status'>
           <button className="start-button" onClick={clickHandler}>{status}</button> 
        </div>
    );
};

export default Status;