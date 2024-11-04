import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { increaseSnakeSize } from "./SnakeSLice";
import { changeScore } from "./GameSlice";

export const checkAppleThunk = createAsyncThunk(
    "apple/checkAppleThunk",
    async (_, { dispatch, getState }) => {
        const state = getState();
        const snakeHead = state.snake.snakeHead;
        const snake = state.snake.snake;
        let apple = state.apple.apple;
        
        if (apple.x === snakeHead.x && apple.y === snakeHead.y) {
            let isOnSnake;
            
            do {
                apple = {
                    x: Math.floor(Math.random() * 10),
                    y: Math.floor(Math.random() * 10)
                };
                isOnSnake = snake.some(s => s.x === apple.x && s.y === apple.y);   
            } while (isOnSnake);
            
            dispatch(increaseSnakeSize());
            dispatch(changeScore());
            return apple;
        }
        return null;
    }
);

const AppleSlice = createSlice({
    name: "apple",
    initialState: {
        apple: { x: 1, y: 1 },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(checkAppleThunk.fulfilled, (state, action) => {
            if (action.payload) {
                state.apple = action.payload; 
            }
        });
    }
});

export const AppleReducer = AppleSlice.reducer;
