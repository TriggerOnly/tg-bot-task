import { createSlice } from "@reduxjs/toolkit";

const SnakeSlice = createSlice({
    name: "snake",
    initialState: {
        snake: [
            {x: 0, y: 0},
            {x: 1, y: 0}
        ],
        snakeHead: {x: 1, y: 0},
        snakeSize: 2,
        direction: 'd',
        stopKeyCombinations: [
            ['w', 's'],
            ['s', 'w'],
            ['a', 'd'],
            ['d', 'a'],
        ],
        savedKey: 'd' 
    },
    reducers: {
        moveSnake(state) {
            let { x, y } = state.snakeHead;
            switch(state.direction) {
                case 'd': x = (x >= 15) ? 0 : x + 1; break;
                case 'a': x = (x <= 0) ? 15 : x - 1; break;
                case 'w': y = (y <= 0) ? 15 : y - 1; break;
                case 's': y = (y >= 15) ? 0 : y + 1; break;
                default: break;
            }
            state.snakeHead = { x, y };
            state.snake.push({ x, y });
            state.snake = state.snake.slice(-state.snakeSize);
        },
        saveKey(state, action) {
            const newKey = action.payload;

            const isOppositeDirection = state.stopKeyCombinations.some(
                ([a, b]) => (a === state.direction && b === newKey) || (b === state.direction && a === newKey)
            );

            if (!isOppositeDirection && state.savedKey !== newKey) {
                state.savedKey = newKey;
            }
        },
        setDirection(state) {
            state.direction = state.savedKey;
        },
        increaseSnakeSize(state) {
            state.snakeSize++;
        }
    }
});

export const { moveSnake, saveKey, setDirection, increaseSnakeSize } = SnakeSlice.actions;
export const SnakeReducer = SnakeSlice.reducer;
