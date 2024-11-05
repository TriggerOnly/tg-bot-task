import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const checkGameover = createAsyncThunk(
  'game/checkGameover',
  async (_, { getState }) => {
    const state = getState();
    const snakeHead = state.snake.snakeHead;
    const snake = state.snake.snake;
    const { x, y } = snakeHead;

    const snakeBody = snake.slice(0, -1);

    const collision = snakeBody.some(segment => segment.x === x && segment.y === y);

    if (collision) {
      return 'Restart';
    }
    return null;
  }
);

const GameSlice = createSlice({
  name: 'game',
  initialState: {
    status: 'Start',
    statusValues: {
      Start: 'Pause',
      Pause: 'Resume',
      Resume: 'Pause',
    },
    score: 0
  },
  reducers: {
    changeStatus(state) {
      state.status = state.statusValues[state.status];
    },
    changeScore(state) {
      state.score++
      console.log(state.score)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(checkGameover.fulfilled, (state, action) => {
      if (action.payload === 'Restart') {
        state.status = 'Restart';
      }
    });
  }
});

export const { changeStatus, changeScore } = GameSlice.actions;
export const GameReducer = GameSlice.reducer;
