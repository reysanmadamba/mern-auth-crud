const NoteList = ({ note = [], onEdit, onDelete }) => {

    return (
        <div>
            <h3>Your Notes</h3>
            {note.map(note => (
                note ? (
                <div key={note._id}>
                    <h4>{note.title}</h4>
                    <p>{note.content}</p>
                    <button onClick={() => onEdit(note)}> Edit </button>
                    <button onClick={() => onDelete(note._id)}> Delete </button>
                </div>

            ) : null
            ))}



        </div>
    )

}

export default NoteList;