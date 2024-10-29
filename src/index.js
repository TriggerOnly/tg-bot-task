import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from './store/gameSlice';
import {Provider} from "react-redux"

const store = configureStore({
  reducer: {
    game: gameReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<<<<<<< HEAD
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>      
  </React.StrictMode>
=======
    <App/>
>>>>>>> b53f8c7f9a9c8b1ccb87f95f8066f2926a845784
);
