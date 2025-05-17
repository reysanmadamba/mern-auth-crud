import './NoteList.css'

const NoteList = ({ note = [], onEdit, onDelete }) => {

    return (
        <div>
            <h3>Content</h3>
            
            
            {note.map(note => (
                note ? (
                <div class="test"key={note._id}>
                    <div class='content'>
                    <h4>{note.title}</h4>
                    <p>{note.content}</p>
                    </div>
                    <div class="content-container">
                    <button class="action edit"onClick={() => onEdit(note)}> Edit </button>
                    <button class="action delete" onClick={() => onDelete(note._id)}> Delete </button>
                    </div>
                </div>

            ) : null
            ))}



        </div>
    )

}

export default NoteList;