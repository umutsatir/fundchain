import React, { useState } from "react";
import "./Story.css";

function Story() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="story-component">
      <h5>Title</h5>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <h5>Body</h5>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
    </div>
  );
}

export default Story;
