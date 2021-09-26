import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import InputArea from "./InputArea";
import Note from "./Note";
import Footer from "./Footer";
// import notes from "../notes";

function App() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios.get("/api/notes")
        .then((res) => setNotes(res.data))
        .catch((err) => console.error(err));
    }, []);

    function addNote(note) {
        axios.post("/api/note/add", note)
        .then((res) => setNotes(res.data))    
        .catch((err) => console.error(err));
    }

    function deleteNote(id) {
        axios.delete("/api/note/delete", {
            data: { objId: id }
        })
        .then((res) => setNotes(res.data))    
        .catch((err) => console.error(err)); 
    }

    return (
        <div>
            <Header />
            <InputArea onSubmit={addNote}/>
            {notes.map((note) => (
                <Note key={note._id.toString()} id={note._id} onClick={deleteNote} title={note.title} content={note.content} />
            ))}
            <Footer />
        </div>
    )
}

export default App;