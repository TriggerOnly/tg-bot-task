import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from "react-redux"
import {GameReducer} from './redux/store/GameSlice';
import { SnakeReducer } from './redux/store/SnakeSLice';
import { AppleReducer } from './redux/store/AppleSlice';
import {BrowserRouter} from 'react-router-dom'

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
      <BrowserRouter>
        <Provider store={store}>
          <App/>
        </Provider> 
    </BrowserRouter>   
  </React.StrictMode>
);
