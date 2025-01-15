import React, { useState, useEffect } from "react";
import styles from "./Story.module.css";
import StoryItem from "../StoryItem/StoryItem";

const Story = ({ updateStory, formData, handleNotification }) => {
    const [storyItems, setStoryItems] = useState([]);

    useEffect(() => {
        if (formData.story && formData.story.length > 0) {
            setStoryItems(formData.story);
        }
    }, [formData.story]);

    const addStoryItem = () => {
        const lastItem = storyItems[storyItems.length - 1];
        if (
            lastItem &&
            (!lastItem.heading || lastItem.paragraphs.some((p) => !p.trim()))
        ) {
            handleNotification(
                "Please fill all of current storys to add new one!",
                "warning"
            );
            return;
        }

        const newStoryItem = {
            id: storyItems.length,
            heading: "",
            paragraphs: [""],
        };

        setStoryItems((prevItems) => [...prevItems, newStoryItem]);
    };

    const updateStoryItem = (id, updatedData) => {
        setStoryItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, ...updatedData } : item
            )
        );
    };

    const removeStoryItem = (id) => {
        setStoryItems((prevItems) => {
            const updatedItems = prevItems.filter((item) => item.id !== id);
            return updatedItems.map((item, index) => ({ ...item, id: index }));
        });
    };

    const saveStory = () => {
        updateStory("story", storyItems);
        handleNotification("Story saved successfully", "success");
    };

    return (
        <div className={styles.storyContainer}>
            <div className={styles.saveBtnWrapper}>
                <button onClick={saveStory} className={styles.saveButton}>
                    Save Story
                </button>
                <p>
                    Please click the save button after you completed your story.
                    Otherwise it will not be saved.
                </p>
            </div>
            <div className={styles.storyWrapper}>
                <div className={styles.storyTitle}>
                    <h2>Project Story</h2>
                    <p>
                        Describe what you're raising funds to do, why you care
                        about it, how you plan to make it happen, and who you
                        are.
                    </p>
                </div>

                <div className={styles.storyContent}>
                    {storyItems.map((item, index) => (
                        <div key={item.id} className={styles.storyItem}>
                            <StoryItem
                                id={item.id}
                                heading={item.heading}
                                paragraphs={item.paragraphs}
                                updateStoryItem={updateStoryItem}
                                removeStoryItem={removeStoryItem}
                            />
                        </div>
                    ))}
                    <button onClick={addStoryItem} className={styles.addButton}>
                        Add Story
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Story;
