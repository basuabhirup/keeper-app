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

    return (
        <div>
            <Header />
            <InputArea onSubmit={addNote}/>
            {notes.map((note, index) => (
                <Note key={`SGBPQ${index}`} id={index} title={note.title} content={note.content} />
            ))}
            <Footer />
        </div>
    )
}

export default App;