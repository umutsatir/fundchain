import React, { useRef } from "react";
import styles from "./StoryItem.module.css";

const StoryItem = ({
    id,
    heading,
    paragraphs = [""],
    updateStoryItem,
    removeStoryItem,
}) => {
    const paragraphRefs = useRef([]);

    const handleTitleChange = (e) => {
        let { value } = e.target;
        updateStoryItem(id, { heading: value });
    };

    const handleParagraphChange = (index, e) => {
        let { value } = e.target;
        const updatedParagraphs = [...paragraphs];
        updatedParagraphs[index] = value;
        updateStoryItem(id, { paragraphs: updatedParagraphs });
    };

    const handleKeyPress = (e, index) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const updatedParagraphs = [...paragraphs];
            updatedParagraphs.splice(index + 1, 0, "");
            updateStoryItem(id, { paragraphs: updatedParagraphs });

            setTimeout(() => {
                paragraphRefs.current[index + 1]?.focus();
            }, 0);
        }
    };

    const handleKeyDown = (e, index) => {
        if (
            e.key === "Backspace" &&
            paragraphs[index] === "" &&
            paragraphs.length > 1
        ) {
            e.preventDefault();
            const updatedParagraphs = paragraphs.filter((_, i) => i !== index);
            updateStoryItem(id, { paragraphs: updatedParagraphs });

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
                value={heading}
                className={styles.input}
                onChange={handleTitleChange}
            />
            {paragraphs.map((paragraph, index) => (
                <div key={index}>
                    <textarea
                        ref={(el) => (paragraphRefs.current[index] = el)}
                        placeholder="Content"
                        value={paragraph}
                        className={styles.input}
                        onChange={(e) => handleParagraphChange(index, e)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                </div>
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
