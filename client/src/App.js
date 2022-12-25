import './App.css';
import {Routes,Route} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import UserActivity from './Pages/UserActivity';

function App() {
  return (
    <div className='App' >
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/user/activity' element={<UserActivity />} />
      </Routes>
    </div>
  );
}

export default App;
