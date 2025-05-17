import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from './LogOutButton'

const Newsfeed = () => {
    
    // const navigate = Navigate();

    // const handleNewsFeedButton = () => {
    //     navigate('/')
    // }

    const [notes, setNotes] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('http://localhost:5001/api/notes/newsfeed',
            {
                method: 'GET',
                cache: 'no-store'
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok')
                }
                return res.json()
            })
            .then(data => {
                console.log('Fetched notes:', data)
                setNotes(data)
            })
            .catch(err => {
                console.error(err)
                setError('Failed to load notes')
            })

    }, [])

    if (error) {
        return <div> Error: {error}</div>
    }

    return (
       
        <div>
            <Link to={'/profile'}> My account</Link> <br /> <br />
            <LogoutButton />
           
             {/* <button onClick={handleNewsFeedButton}>NewsFeed</button> */}
            <h2>Newsfeed</h2>
            {notes.map(note => (
                <div key={note._id}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <small>
                        Posted By:{' '}
                        {note.userId ? (
                             <Link to={`/users/${note.userId._id}`}>
                        {note.userId.username || note.userId?.email}
                        </Link>
                        ) : ( 'Unknown User')}
                        </small>
                        
                    <hr />
                </div>
            ))}
        </div>
        
    )

}

export default Newsfeed;