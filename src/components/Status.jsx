import { useSelector, useDispatch } from 'react-redux';
import { changeStatus, checkGameover } from '../store/GameSlice'
import { moveSnake, setDirection } from '../store/SnakeSLice';
import { checkAppleThunk } from '../store/AppleSlice';
import { useEffect, useRef } from 'react';
import '../App.css'

function Status() {
    const status = useSelector(store => store.game.status);
    const score = useSelector(store => store.game.score)
    const snakeHead = useSelector(state => state.snake.snakeHead);
    const snake = useSelector(state => state.snake.snake);
    const dispatch = useDispatch();

    let timer = useRef(null);

    const update = () => {
        if (status === 'Restart') {
            stopTimer();
            return; 
        }
        dispatch(moveSnake());
        dispatch(setDirection());
        dispatch(checkAppleThunk({ snakeHead, snake }));
        dispatch(checkGameover({ snakeHead, snake }));
    };

    const startTimer = () => {
        if (timer.current === null) {
            timer.current = setInterval(update, 200);
        }
    };

    const stopTimer = () => {
        clearInterval(timer.current);
        timer.current = null;
    };

    const clickHandler = () => {
        if (status === 'Restart') {
            window.location.reload();
            return;
        }
        if (status !== 'Pause') startTimer();
        else stopTimer();
        dispatch(changeStatus());
    };

    useEffect(() => {
        if (status === 'Restart') {
            stopTimer();
        }
    }, [status]);

    return (
        <div className='Header'>
            <h3>{score}</h3>
            <div className="Status">
                <button className="start-button" onClick={clickHandler}>{status}</button>
            </div>
        </div>
    );
}

export default Status;