import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {

   const [isExpanded, setExpanded] = useState(false);

    const [newNote,setNewNote] = useState({
        title:"",
        content:""
    });
    
    function HandleTitle(event){
        setNewNote({
            title:event.target.value,
            content:newNote.content
        });
    }

    function HandleContent(event){
        setNewNote({
            title:newNote.title,
            content:event.target.value
        });
    }

    function expand() {
      setExpanded(true);
    }

    function HandleClick(event){
        props.addNote(newNote);
        setNewNote({
            title:"",
            content:""
        });
        event.preventDefault();
    }

  return (
    <div>
      <form className="create-note">
      {isExpanded && (
        <input name="title" placeholder="Title" value={newNote.title} onChange={HandleTitle} />
        )}
        <textarea name="content" value={newNote.content} placeholder="Take a note..." onClick={expand} rows={isExpanded ? 3 : 1}  onChange={HandleContent} />
        <Zoom in={isExpanded}>
        <Fab onClick={HandleClick}><AddIcon /></Fab> 
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;