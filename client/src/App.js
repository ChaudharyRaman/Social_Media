import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import UserActivity from './Pages/UserActivity';
import People from './Activity/People'
import Photos from './Activity/Photos'
import Group from './Activity/Group'
import Feed from './Components/Feed';
import Watch from './Activity/Watch';
import Profile from './Pages/Profile';

function App() {
  return (
    <div className='App' >
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/user/activity' element={<UserActivity />}>
          <Route index element={<Feed/>} />
          <Route path='people' element={<People/>} />
          <Route path='photos' element={<Photos />} />
          <Route path='group' element={<Group />} />
          <Route path='watch' element={<Watch />} />
        </Route>
        <Route path='/user/:id/profile' element={<Profile/>} />
        <Route path='*' element={<h1>PAGE NOT FOUND</h1>} />
      </Routes>
    </div>
  );
}

export default App;
