import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Profile from './components/Profile'
import PrivateRoute from './components/PrivateRoute'
import RegisterForm from './components/RegisterForm';
import Newsfeed from './components/NewsFeed';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>

        <Route path="/register" element={<RegisterForm />}/>
        <Route path="/login" element={<LoginForm />} />

        <Route path="/newsfeed" element={<Newsfeed />} />
        <Route path="/users/:userId" element={<UserProfile />}/>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />

        </Route>
      </Routes>

    </BrowserRouter>

  );
}

export default App;
