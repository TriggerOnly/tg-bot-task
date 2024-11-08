import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLoginAndRegister, fetchAuth } from './redux/slices/Auth';
import {Routes, Route} from 'react-router-dom'
import Snake from './pages/Snake';
import useTelegram from './hooks/useTelegram';

function App() {
  const {userId} = useTelegram()
  const dispatch = useDispatch();

  //Регистрация и вход по Id в Telegram
  useEffect(() => {
    const userParams = {
      tgId: userId
    };
    dispatch(fetchLoginAndRegister(userParams));
  }, [userId, dispatch]);

  // Автоматический вход
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        dispatch(fetchAuth());
    }
}, [dispatch]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Snake/>}/>
      </Routes>
    </>
  );
}

export default App;
