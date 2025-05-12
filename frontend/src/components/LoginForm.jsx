import { useState } from "react";
import axios from '../api/axiosInstance';

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('login', {email, password});

            localStorage.setItem('token', res.data.token)

            alert('Login successful');
        }
        catch (err) {
            alert(err.response?.data?.message || 'Login failed')

        }
    }

    return (
        <form onSubmit={handleLogin}>
            <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" required
            
            />

            <input
            type="password"
            value="{password}"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password" required
         
            />

            <button type="submit">Login</button>



        </form>
    )
}

export default LoginForm;