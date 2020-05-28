import React from "react";
import Note from "./note";

const App = ({ notes }) => (
  <div>
    <h1>Notes:</h1>
    <ul>
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </ul>
  </div>
);

export default App;
