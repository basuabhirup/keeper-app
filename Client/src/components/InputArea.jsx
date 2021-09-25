import React, { useState } from "react";
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import AddIcon from '@material-ui/icons/Add';

function InputArea(props) {
    const [note, setNote] = useState({
        title: "",
        content: ""
    })

    const [isClicked, setIsClicked] = useState(false);

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
      <form className="create-note" onSubmit={ (e) => {          
          props.onSubmit(note);
          e.preventDefault();
          setIsClicked(false);
          setNote({ title: "", content: "" });
        } 
      }>
        {isClicked && <input name="title" onChange={updateNote} placeholder="Title" value={note.title}/>}
        <textarea 
          name="content" 
          onClick={ () => setIsClicked(true)} 
          onChange={updateNote} 
          placeholder="Take a note..." 
          rows={isClicked ? "3" : "1"} 
          value={note.content} 
        />
        <Zoom in={isClicked}>
          <Fab type="submit">
            <AddIcon />
          </Fab>
        </Zoom>
        
      </form>
    </div>
  );
}

export default InputArea;
