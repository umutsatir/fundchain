import React, { useRef, useState, useEffect } from "react";
import styles from "./StoryItem.module.css";

const StoryItem = ({
    id,
    heading,
    paragraphs = [""],
    updateStoryItem,
    removeStoryItem,
    setStoryWarning,
}) => {
    const paragraphRefs = useRef([]);
    const [titleWarning, setTitleWarning] = useState(false);
    const [contentWarnings, setContentWarnings] = useState([]);

    useEffect(() => {
        const hasWarning = titleWarning || contentWarnings.includes(true);
        setStoryWarning(hasWarning);
    }, [titleWarning, contentWarnings, setStoryWarning]);

    const handleTitleChange = (e) => {
        let { value } = e.target;

        if (value.length != 0 && (value.length < 5 || value.length > 50)) {
            setTitleWarning(true);
            value = value.slice(0, 50);
        } else {
            setTitleWarning(false);
        }
        updateStoryItem(id, { heading: value });
    };

    const handleParagraphChange = (index, e) => {
        let { value } = e.target;
        const warnings = [...contentWarnings];

        if (value.length != 0 && (value.length < 10 || value.length > 500)) {
            warnings[index] = true;
            value = value.slice(0, 500);
        } else {
            warnings[index] = false;
        }
        setContentWarnings(warnings);

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
                className={`${styles.input} ${titleWarning ? styles.invalidInput : ""}`}
                onChange={handleTitleChange}
            />
            {titleWarning && (
                <div className={styles.warning}>
                    <p>Warning: Title should consist of minimum 5 and maximum 50 characters.</p>
                </div>
            )}
            {paragraphs.map((paragraph, index) => (
                <div key={index}>
                    <textarea
                        ref={(el) => (paragraphRefs.current[index] = el)}
                        placeholder="Content"
                        value={paragraph}
                        className={`${styles.input} ${contentWarnings[index] ? styles.invalidInput : ""}`}
                        onChange={(e) => handleParagraphChange(index, e)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                    {contentWarnings[index] && (
                        <div className={styles.warning}>
                            <p>Warning: Content should consist of minimum 10 and maximum 500 characters.</p>
                        </div>
                    )}
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
