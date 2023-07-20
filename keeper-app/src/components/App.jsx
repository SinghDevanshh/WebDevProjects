import React, { useState } from 'react';
import Heading from './Header';
import Footer from './footer';
import Note from './Note';
import CreateArea from "./CreateArea"
import { v4 as uuidv4 } from 'uuid';

function App(){

    const [notes,setNotes] = useState([])

    function AddNote(note){
        const newNote = {
            key:uuidv4(),
            ...note
        }
        setNotes(prevNotes => {
            return [...prevNotes, newNote];
          });
    }

    function deleteNote(id){
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem, index) => {
              return noteItem.key !== id;
            });
          });
    }

    return (
        <div>
        <Heading />
        <CreateArea addNote={AddNote}/>
        {notes.map((note) => (<Note id={note.key} key={note.key} title={note.title} content={note.content} deleteNote={deleteNote}/>))}
        <Footer />
        </div>
    )
}

export default App;