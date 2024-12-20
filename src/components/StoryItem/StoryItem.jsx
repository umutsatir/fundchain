import React from "react";
import styles from "./StoryItem.module.css";

const StoryItem = ({ id, title, content, updateStoryItem, removeStoryItem }) => {
  const handleTitleChange = (e) => {
    updateStoryItem(id, { title: e.target.value });
  };

  const handleContentChange = (e) => {
    updateStoryItem(id, { content: e.target.value });
  };

  return (
    <div className={styles.storyComponent}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={handleContentChange}
      />
      <button
        onClick={() => removeStoryItem(id)}
        className={styles.removeButton}
      >
        Remove
      </button>
    </div>
  );
};

export default StoryItem;
