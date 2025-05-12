import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Profile from './components/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />}/>

      </Routes>

    </BrowserRouter>

  );
}

export default App;
