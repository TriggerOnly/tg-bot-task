import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAuth } from './redux/slices/Auth';
import {Routes, Route} from 'react-router-dom'
import Snake from './pages/Snake';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userParams = {
      tgId: "example_tgId",   // добавьте сюда реальные данные
      username: "example_user" 
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
