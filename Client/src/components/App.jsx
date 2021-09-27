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
        axios.get("https://keeper-app-backend-basuabhirup.vercel.app/api/notes")
        .then((res) => {
            if(res.data.length > 0 ) {
                setNotes([...res.data]);
            } else {
                setNotes([]);
            }  
        })
        .catch((err) => console.error(err));
    }, []);

    function addNote(note) {
        axios.post("https://keeper-app-backend-basuabhirup.vercel.app/api/note/add", note)
        .then((res) => setNotes([...res.data])) 
        .catch((err) => console.error(err));
    }

    function deleteNote(id) {
        axios.delete("https://keeper-app-backend-basuabhirup.vercel.app/api/note/delete", { data: { objId: id} })
        .then((res) => {
            if (res.data === `Deleted note with id: ${id} !`) {
                setNotes(notes.filter(note => note._id !== id))
            }
        })
        .catch((err) => console.error(err));
    }

    return (
        <div>
            <Header />
            <InputArea onSubmit={addNote}/>
            <article className="note-container">
                {notes.map((note) => (
                    <Note key={note._id} id={note._id} onClick={deleteNote} title={note.title} content={note.content} />
                ))}
            </article>       
            <Footer />
        </div>
    )
}

export default App;
