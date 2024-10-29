import './App.css'
import { useDispatch } from 'react-redux';
import { saveKey } from './store/gameSlice';
import { Board } from './components/Board/Board';
import Status from './components/Status'
import './App.css'

function App() {
  const dispatch = useDispatch()

  const  keyDownHandler = (event) => {
    dispatch(saveKey(event.key))
  }

  return (
<<<<<<< HEAD
    <div className='App'onKeyDownCapture={keyDownHandler}>
       <Board/>
       <Status/>
=======
    <div>
      <h1>
        Hello world!
      </h1>
>>>>>>> b53f8c7f9a9c8b1ccb87f95f8066f2926a845784
    </div>
  );
}

export default App;
