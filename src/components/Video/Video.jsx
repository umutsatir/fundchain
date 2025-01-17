import React, { useState } from "react";
import styles from "./Video.module.css";

function Video({ updateBasics, formData, setVideoWarning }) {
    const [warning, setWarning] = useState(null);

    const handleInputChange = (e) => {
        let value = e.target.value;
        let warningMessage = null;

        if (value.length === 0) {
            warningMessage = null;
        } else if (value.length < 5 || value.length > 100) {
            warningMessage =
                "Link should consist of minimum 5 and maximum 100 characters.";
            value = value.slice(0, 100);
        } else if (!value.startsWith("https://")) {
            warningMessage = "The link must start with 'https://'.";
        } else if (
            !/^https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/.test(
                value
            )
        ) {
            warningMessage = "The link must be a valid YouTube URL.";
        }

        setWarning(warningMessage);
        setVideoWarning(warningMessage);
        updateBasics("video", value);
    };

    return (
        <div className={styles.section}>
            <h2>Project Video (optional)</h2>
            <p>Add a video to showcase your project. (Only YouTube links)</p>
            <input
                type="text"
                placeholder="Video link..."
                className={`${styles.input} ${
                    warning ? styles.invalidInput : ""
                }`}
                id="video"
                value={formData.video}
                onChange={handleInputChange}
            />
            {warning && (
                <div className={styles.warning}>
                    <p>{warning}</p>
                </div>
            )}
        </div>
    );
}

export default Video;
