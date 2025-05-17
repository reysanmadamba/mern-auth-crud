import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';


const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null)
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null)


    useEffect(() => {
        console.log('userId', userId)
        axiosInstance.get(`/users/${userId}`)
            .then(res => {
                setUser(res.data.user)
                setNotes(res.data.notes)
            })
            .catch(err => setError(err.message))
    }, [userId])

    if (error) return <div> Error: {error}</div>
    if (!user) return <div>Loading...</div>

    return (
        <div>
            <Link to="/newsfeed"> Newsfeed</Link>
            <br />
            <Link to="/profile">Profile</Link>
            <h2>{user.username}</h2>
            <p>Email: {user.email}</p>

            <h3> Post by: {user.username}</h3>
            {notes.length === 0 ? (
                <p>No posts yet.</p>
            ) : (
                <ul>
                    {notes.map(note => (
                        <li key={note._id}>
                            <h4>{note.title}</h4>
                            <p>{note.content}</p>
                        </li>
                    ))}
                </ul>
            )}


        </div>
    )
}

export default UserProfile;