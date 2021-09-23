import React, { useState } from "react";

function InputArea(props) {
    const [note, setNote] = useState({
        title: "",
        content: ""
    })

    function updateNote(e) {
        const name = e.target.name;
        const value = e.target.value;

        setNote({
            ...note,
            [name]: value
        })
    }
    
  return (
    <div>
      <form onSubmit={ (e) => {          
          props.onSubmit(note);
          e.preventDefault();
          setNote({ title: "", content: "" });
        } 
      }>
        <input name="title" onChange={updateNote} placeholder="Title" value={note.title}/>
        <textarea name="content" onChange={updateNote} placeholder="Take a note..." rows="3" value={note.content} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default InputArea;
