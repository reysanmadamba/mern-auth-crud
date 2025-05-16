import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Profile from './components/Profile'
import PrivateRoute from './components/PrivateRoute'
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="/register" element={<RegisterForm />}/>
        <Route path="/login" element={<LoginForm />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />

        </Route>
      </Routes>

    </BrowserRouter>

  );
}

export default App;
