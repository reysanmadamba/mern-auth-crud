import { useState, useEffect } from "react";

const NoteForm = ({onSubmit, existingNote}) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect (() => {
        if (existingNote) {
            setTitle(existingNote.title)
            setContent(existingNote.content)
        }
    }, [existingNote]);

    const handleSubmit = (e) => {
        e.preventDefault();
            onSubmit({ title, content })
            setTitle('');
            setContent('');

    } 

    return (
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title"/>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Type text"/>
                <button type="submit">{existingNote ? 'Update' : 'Create'} Note </button>

        </form>
    )

}

export default NoteForm;