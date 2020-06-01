import React, { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/note";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    axios.get("http://localhost:3001/notes").then((response) => {
      setNotes(response.data);
    });
  };

  useEffect(hook, []);

  const addNote = (event) => {
    event.preventDefault();

    const noteOject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    axios.post("http://localhost:3001/notes", noteOject).then((response) => {
      setNotes(notes.concat(response.data));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const toggleImportance = (event) => {
    setShowAll(!showAll);
  };

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`);
    const url = `http://localhost:3001/notes/${id}`;
    const noteObject = notes.find((note) => note.id === id);
    const changedNote = { ...noteObject, important: !noteObject.important };

    axios.put(url, changedNote).then((response) => {
      setNotes(notes.map((note) => (note.id !== id ? note : response.data)));
    });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  console.log(showAll);
  console.log(notesToShow);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={toggleImportance}>
          Show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" placeholder={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;
