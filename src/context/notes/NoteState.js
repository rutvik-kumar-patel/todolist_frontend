import NoteContext from "./noteContext";
import { useState } from "react";
import { message } from "antd";

const NoteState = (props) => {
  const host = process.env.REACT_APP_API_HOST
  const notesInitial = []
  
  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('toDoAppUser')
      }
    });
    const json = await response.json()
    return json
    
  }

  // Add a Note
  const addNote = async (title, description) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('toDoAppUser')
      },
      body: JSON.stringify({title, description,isCompleted:false})
    });
    const note = await response.json();
    console.log(note)
    message.success("To Do Task Added Successfully!");
    // console.log(note)
    // setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('toDoAppUser')
      }
    });
    const json = await response.json();
    message.success(`${json.note.title} is Deleted Successfully!`);
    return json
    
  }

  // Edit a Note
  const editNote = async (id, title, description, isCompleted) => {
    console.log(isCompleted)
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('toDoAppUser')
      },
      body: JSON.stringify({title, description, isCompleted})
    });
    const json = await response.json();  
    return json
    
     
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;