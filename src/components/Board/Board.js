import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Square from '../Square/Square'
import { saveKey, setDirection } from '../../store/gameSlice'
import './Board.css'

export const Board = () => {
    const dispatch = useDispatch()
    let squares = []

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            squares.push({ x, y, index: '' + x + y })
        }
    }

    const [touchStart, setTouchStart] = useState({ x: 0, y: 0 })
    const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 })

    const handleSwipeDirection = () => {
        const diffX = touchEnd.x - touchStart.x
        const diffY = touchEnd.y - touchStart.y
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) dispatch(saveKey('d')) 
            else dispatch(saveKey('a'))
        } else {
            if (diffY > 0) dispatch(saveKey('s')) 
            else dispatch(saveKey('w'))
        }
        dispatch(setDirection())
    }

    const handleTouchStart = (e) => {
        setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    }

    const handleTouchMove = (e) => {
        setTouchEnd({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    }

    const handleTouchEnd = () => {
        handleSwipeDirection()
    }

    return (
        <div
            className='Board'
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {squares.map((square) => {
                return (
                    <span key={square.index}>
                        <Square square={square} />
                    </span>
                )
            })}
        </div>
    )
}
