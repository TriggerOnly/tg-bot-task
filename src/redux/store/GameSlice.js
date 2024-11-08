import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const checkMaxScore = (score) => {
  const maxScore = localStorage.getItem('maxScore') || 0;
  if (score > maxScore) {
      localStorage.setItem('maxScore', score); // Сохраняем новый рекорд в localStorage
      return score; // Новый рекорд
  }
  return maxScore;
};

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
    score: 0,
    maxScore: localStorage.getItem('maxScore') || 0
  },
  reducers: {
    changeStatus(state) {
      state.status = state.statusValues[state.status];
    },
    changeScore(state) {
      state.score++
      
      const newMaxScore = checkMaxScore(state.score);
      state.maxScore = newMaxScore;
    },
    resetScore(state) {
      state.score = 0;
  }
  },
  extraReducers: (builder) => {
    builder.addCase(checkGameover.fulfilled, (state, action) => {
      if (action.payload === 'Restart') {
        state.status = 'Restart';
        state.score = 0
      }
    });
  }
});

export const { changeStatus, changeScore } = GameSlice.actions;
export const GameReducer = GameSlice.reducer;
