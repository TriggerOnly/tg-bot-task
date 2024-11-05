import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAuth } from './redux/slices/Auth';
import {Routes, Route} from 'react-router-dom'
import Snake from './pages/Snake';
import useTelegram from './hooks/useTelegram';

function App() {
  const {username, userId} = useTelegram()
  const dispatch = useDispatch();

  useEffect(() => {
    const userParams = {
      tgId: username, 
      username: userId
    };
    dispatch(fetchAuth(userParams));
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Snake/>}/>
      </Routes>
    </>
  );
}

export default App;
