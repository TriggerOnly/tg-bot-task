import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from "react-redux"
import {GameReducer} from './store/GameSlice';
import { SnakeReducer } from './store/SnakeSLice';
import { AppleReducer } from './store/AppleSlice';

const store = configureStore({
  reducer: {
    game: GameReducer,
    snake: SnakeReducer,
    apple: AppleReducer
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>      
  </React.StrictMode>
);
