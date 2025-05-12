import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Profile from './components/Profile'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />

        </Route>
      </Routes>

    </BrowserRouter>

  );
}

export default App;
