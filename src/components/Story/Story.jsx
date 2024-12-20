import React, { useState, useEffect } from "react";
import styles from "./Story.module.css";
import StoryItem from "../StoryItem/StoryItem";

const Story = ({ updateStory, formData }) => {
  const [storyItems, setStoryItems] = useState([]);

  useEffect(() => {
    if (formData.story && formData.story.length > 0) {
      setStoryItems(formData.story);
    }
  }, [formData.story]);

  const addStoryItem = () => {
    const newStoryItem = {
      id: storyItems.length,
      title: "",
      content: "",
    };

    setStoryItems((prevItems) => {
      const updatedItems = [...prevItems, newStoryItem];
      updateStory("story", updatedItems);
      return updatedItems;
    });
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
    setStoryItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);

      const updatedItemsWithNewIds = updatedItems.map((item, index) => ({
        ...item,
        id: index,
      }));

      updateStory("story", updatedItemsWithNewIds);
      return updatedItemsWithNewIds;
    });
  };

  return (
    <div className={styles.storyContainer}>
      <div className={styles.storyWrapper}>
        <div className={styles.storyTitle}>
          <h2>Project Story</h2>
          <p>
            Describe what you're raising funds to do, why you care about it, how
            you plan to make it happen, and who you are.
          </p>
        </div>

        <div className={styles.storyContent}>
          {storyItems.map((item) => (
            <div key={item.id} className={styles.storyItem}>
              <StoryItem
                id={item.id}
                title={item.title}
                content={item.content}
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
