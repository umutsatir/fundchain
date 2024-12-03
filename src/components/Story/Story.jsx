import React from "react";
import styles from "./Story.module.css";
import StoryItem from "../StoryItem/StoryItem"; 

const Story = () => {
  return (
    <div className={styles["story-container"]}>
      <div className={styles["story-wrapper"]}>
        <div className={styles["story-title"]}>
          <h2>Project Story</h2>
          <p>Describe what you're raising funds to do, why you care about it, how you plan to make it happen, and who you are.</p>
        </div>

        <div className={styles["story-content"]}>
        <div className={styles["story-item"]}>
          <StoryItem/>
        </div>
        /* button */
        </div>
      </div>
    </div>
  );
};

export default Story;
