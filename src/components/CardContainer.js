import React, { useRef, useState } from "react";
import Cards from "./Cards";

const CardContainer = () => {
  const inputRef = useRef();
  const data = [
    {
      id: 1,
      text: "check the playlist",
    },
    {
      id: 2,
      text: "make a project",
    },
  ];

  const [notes, setNotes] = useState(data);
  const addNote = () => {
    setNotes([
      ...notes,
      { id: notes.length + 1, text: inputRef.current.value },
    ]);
    inputRef.current.value = "";
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "0",
          right: "0",
          margin: "0 auto",
          minWidth: "220px",
          width: "220px",
        }}
      >
        <input type="text" ref={inputRef} />
        <button onClick={addNote}>add</button>
      </div>
      <Cards notes={notes} setNotes={setNotes} />
    </>
  );
};

export default CardContainer;
