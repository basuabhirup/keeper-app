import React from "react";
import Header from "./Header";
import InputArea from "./InputArea";
import Note from "./Note";
import Footer from "./Footer";
import notes from "../notes";

function App() {
    return (
        <div>
            <Header />
            <InputArea />
            {notes.map(note => (
                <Note key={note.key} title={note.title} content={note.content} />
            ))}
            <Footer />
        </div>
    )
}

export default App;