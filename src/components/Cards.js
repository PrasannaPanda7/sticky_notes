import React, { createRef, useEffect, useRef } from "react";
import Note from "./Note";

const Cards = ({ notes = [], setNotes = () => {} }) => {
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    const updatedNotes = notes.map((note) => {
      const savedNote = savedNotes?.find((n) => n.id === note.id);
      if (savedNote) {
        return { ...note, position: savedNote.position };
      } else {
        const position = determineNewPosition();
        return { ...note, position };
      }
    });
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }, [notes.length]);

  const noteRefs = useRef([]);

  const determineNewPosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

  const handleDragStart = (note, e) => {
    const { id } = note;
    const startPos = note.position;
    const noteRef = noteRefs.current[id].current;
    const rect = noteRef.getBoundingClientRect();
    const offSetX = e.clientX - rect.left;
    const offSetY = e.clientY - rect.top;

    const handleMouseMove = (e) => {
      const newX = e.clientX - offSetX;
      const newY = e.clientY - offSetY;
      noteRef.style.left = newX + "px";
      noteRef.style.top = newY + "px";
    };
    const handleMouseUp = (e) => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (checkForOverLap(id)) {
        noteRef.style.left = startPos.x + "px";
        noteRef.style.top = startPos.y + "px";
      } else {
        const { left, top } = noteRef.getBoundingClientRect();
        const newPosition = {
          x: left,
          y: top,
        };
        updateNotePosition(note, newPosition);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    const updateNotePosition = (note, newPosition) => {
      const updatedNotes = notes.map((n) =>
        n.id === note.id ? { ...n, position: newPosition } : n
      );
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };
  };

  const checkForOverLap = (id) => {
    const currentRect = noteRefs.current[id].current.getBoundingClientRect();
    return notes.some((note) => {
      if (note.id === id) return false;
      const otherRect =
        noteRefs.current[note.id].current.getBoundingClientRect();
      const a = !(
        currentRect.left > otherRect.right ||
        currentRect.right < otherRect.left ||
        currentRect.top > otherRect.bottom ||
        currentRect.bottom < otherRect.top
      );
      return a;
    });
  };

  return (
    <>
      {notes.map((note) => (
        <Note
          key={note.id}
          initialPos={note.position}
          content={note.text}
          ref={
            noteRefs.current[note.id]
              ? noteRefs.current[note.id]
              : (noteRefs.current[note.id] = createRef())
          }
          onMouseDown={(e) => handleDragStart(note, e)}
        />
      ))}
    </>
  );
};

export default Cards;
