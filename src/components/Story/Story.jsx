import React, { useState, useEffect } from "react";
import styles from "./Story.module.css";
import StoryItem from "../StoryItem/StoryItem";

const Story = ({ updateStory, formData, setStoryWarning, handleNotification }) => {
    const [storyItems, setStoryItems] = useState([]);
    const [warnings, setWarnings] = useState([]);

    useEffect(() => {
        if (formData.story && formData.story.length > 0) {
            setStoryItems(formData.story);
        }
    }, [formData.story]);

    useEffect(() => {
        const hasAnyWarning = warnings.some((warning) => warning === true);
        setStoryWarning(hasAnyWarning);
    }, [warnings, setStoryWarning]);

    const addStoryItem = () => {
        const lastItem = storyItems[storyItems.length - 1];
        if (lastItem && (!lastItem.heading || lastItem.paragraphs.some((p) => !p.trim()))) {
            handleNotification("Please fill all of current storys to add new one!", "warning")
            return;
        }
    
        const newStoryItem = {
            id: storyItems.length,
            heading: "",
            paragraphs: [""],
        };
    
        setStoryItems((prevItems) => {
            const updatedItems = [...prevItems, newStoryItem];
            updateStory("story", updatedItems);
            return updatedItems;
        });
    
        setWarnings((prevWarnings) => [...prevWarnings, false]);
    };

    const updateStoryItem = (id, updatedData) => {
        setStoryItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                item.id === id ? { ...item, ...updatedData } : item
            );
            updateStory("story", updatedItems);
            return updatedItems;
        });
    };

    const removeStoryItem = (id) => {
        const updateStoryItems = new Promise((resolve) => {
            setStoryItems((prevItems) => {
                const updatedItems = prevItems.filter((item) => item.id !== id);
        
                const updatedItemsWithNewIds = updatedItems.map((item, index) => ({
                    ...item,
                    id: index,
                }));
                updateStory("story", updatedItemsWithNewIds);
        
                resolve(updatedItemsWithNewIds);
                return updatedItemsWithNewIds;
            });
        });
    
        updateStoryItems.then(() => {
            const updatedWarnings = warnings
                    .filter((_, index) => index !== id)
                    .slice(0, storyItems.length - 1);
    
            setWarnings(updatedWarnings);
        });
    };
    
    

    const handleItemWarning = (id, warning) => {
        setWarnings((prevWarnings) => {
            const updatedWarnings = [...prevWarnings];
            updatedWarnings[id] = warning;
            return updatedWarnings;
        });
    };

    return (
        <div className={styles.storyContainer}>
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
                                setStoryWarning={(warning) =>
                                    handleItemWarning(index, warning)
                                }
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
