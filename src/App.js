import './App.css';
import {  Route, Routes, useNavigate } from 'react-router-dom';
import Landing from './pages/Landing/Landing.js';
import Login from './pages/Auth/Login.js';
import Signup from './pages/Auth/Signup.js';
import ToDoList from './pages/ToDo/ToDoList.js';
import NoteState from './context/notes/NoteState';


const App = () => {
  return (
    <>
      <NoteState>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/to-do-list" element={<ToDoList />} />
          </Routes>
        
      </NoteState>
    </>
  );
}

export default App;
