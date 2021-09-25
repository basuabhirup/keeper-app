import React, { useState } from "react";
import Header from "./Header";
import InputArea from "./InputArea";
import Note from "./Note";
import Footer from "./Footer";
// import notes from "../notes";

function App() {
    const [notes, setNotes] = useState([]);

    function addNote(note) {
        setNotes([...notes, note]);
    }

    function deleteNote(id) {
        setNotes(prevArray => {
            return prevArray.filter((note, index) => index !== id);
        })
    }

    return (
        <div>
            <Header />
            <InputArea onSubmit={addNote}/>
            {notes.map((note, index) => (
                <Note key={`SGBPQ${index}`} id={index} onClick={deleteNote} title={note.title} content={note.content} />
            ))}
            <Footer />
        </div>
    )
}

export default App;