import { useEffect, useState } from "react";
import axios from '../api/axiosInstance'
import logout from './LogOutButton'
import LogoutButton from "./LogOutButton";

const Profile = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        axios.get('/profile')
        .then(res => setUser(res.data))
        .catch(err => console.error('Not authorized!', err))
    }, []);

    if (!user) return <p>Loading profile...</p>

    return (
        <div>
            <h2>Welcome, {user.username}</h2>
            <p>Email: {user.email}</p>

            <LogoutButton />
        </div>
    )

}

export default Profile;