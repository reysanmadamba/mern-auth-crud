import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'




const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/users/register', { username, email, password })

            alert("Registration successfull!")
            navigate('/login');
        }

        catch (error) {
            console.error("registration error", error)
            alert(error.response.data?.message || "Registration failed!")
        }

    }

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>

            <input type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required />

            <input type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />

            <input type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />


            <button type="submit">Register</button>
            <button type="button" onClick={() => navigate('/login') }> Already have an account?</button>
        </form>
        



    )
}

export default RegisterForm;