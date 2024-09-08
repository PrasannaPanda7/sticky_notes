import React, { forwardRef } from "react";

const Note = forwardRef(
  ({ content = "", initialPos = {}, onMouseDown }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          backgroundColor: "lightyellow",
          width: "100px",
          border: "2px solid black",
          userSelect: "none",
          cursor: "move",
          position: "absolute",
          top: initialPos?.y + "px",
          left: initialPos?.x + "px",
        }}
        onMouseDown={onMouseDown}
      >
        📌{content}
      </div>
    );
  }
);

export default Note;
