import { useEffect, useState } from "react";
import axios from '../api/axiosInstance'
import LogoutButton from "./LogOutButton";
import NoteList from "./NoteList";
import NoteForm from "./NoteForm";
import { Link } from 'react-router-dom'

const Profile = () => {
    const [user, setUser] = useState(null)
    const [notes, setNotes] = useState([])
    const [editingNote, setEditingNote] = useState(null);

    useEffect(() => {
        axios.get('/users/profile')
            .then(res => {
                console.log("profile data", res.data)
                setUser(res.data)
        fetchNotes();
    })
    .catch(err => console.error(err))
}, []);

const fetchNotes = () => {
    axios.get('/notes').then(res => setNotes(res.data))
}

const handleCreateOrUpdate = (noteData) => {
    if (editingNote) {
        axios.put(`/notes/${editingNote._id}`, noteData).then(() => {
            setEditingNote(null);
            fetchNotes();
        })
    }
    else {
        axios.post('/notes', noteData).then(fetchNotes);
    }
}

const handleDelete = (id) => {
    axios.delete(`/notes/${id}`).then(fetchNotes)
}


if (!user) return <p>Loading profile...</p>

return (
    <div>
         <Link to="/newsfeed"> Newsfeed</Link>
        <h2>Welcome, {user.username}</h2>
        <p>Email: {user.email}</p>

        <LogoutButton />
        

        <h3>{editingNote ? 'Edit Note' : ' Create Note'}</h3>
        <NoteForm onSubmit={handleCreateOrUpdate} existingNote={editingNote} />

        <NoteList note={notes} onEdit={setEditingNote} onDelete={handleDelete} />
       
    </div>
)

}

export default Profile;