import React, { useRef } from "react";
import styles from "./StoryItem.module.css";

const StoryItem = ({ id, title, paragraphs = [""], updateStoryItem, removeStoryItem }) => {
  const paragraphRefs = useRef([]); // Yeni eklenen alana otomatik geçiş için referans

  const handleParagraphChange = (index, value) => {
    const updatedParagraphs = [...paragraphs];
    updatedParagraphs[index] = value;
    updateStoryItem(id, { paragraphs: updatedParagraphs });
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const updatedParagraphs = [...paragraphs];
      updatedParagraphs.splice(index + 1, 0, ""); // Yeni bir paragraf ekle
      updateStoryItem(id, { paragraphs: updatedParagraphs });

      // Yeni textarea'ya odaklan
      setTimeout(() => {
        paragraphRefs.current[index + 1]?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && paragraphs[index] === "" && paragraphs.length > 1) {
      e.preventDefault();
      const updatedParagraphs = paragraphs.filter((_, i) => i !== index);
      updateStoryItem(id, { paragraphs: updatedParagraphs });

      // Önceki textarea'ya odaklan
      setTimeout(() => {
        paragraphRefs.current[index - 1]?.focus();
      }, 0);
    }
  };

  return (
    <div className={styles.storyComponent}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => updateStoryItem(id, { title: e.target.value })}
      />
      {paragraphs.map((paragraph, index) => (
        <textarea
          key={index}
          ref={(el) => (paragraphRefs.current[index] = el)}
          placeholder="Content"
          value={paragraph}
          onChange={(e) => handleParagraphChange(index, e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
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
