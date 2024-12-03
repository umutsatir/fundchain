// Campaign.jsx
import React, { useEffect, useState } from "react";
import styles from "./Campaign.module.css";

function Campaign({ story: initialStory }) {
    const [story, setStory] = useState(initialStory || []);
    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
        if (initialStory) {
            setStory(initialStory);
        }
    }, [initialStory]);

    // Scroll fonksiyonu
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        const element = document.getElementById(tab);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className={styles.campaignBar}>
            <div className={styles.campaignTabs}>
                {story.map((tab, index) => (
                    <div
                        key={index}
                        className={`${styles.campaignTab} ${
                            activeTab === tab.heading ? styles.active : ""
                        }`}
                        onClick={() => handleTabClick(tab.heading)}
                    >
                        {tab.heading}
                        {activeTab === tab.heading && (
                            <div className={styles.topIndicator}></div>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.descriptionContainer}>
                <h2>Story</h2>
                {story.map((tab, index) => (
                    <div
                        key={index}
                        id={tab.heading}
                        className={styles.contentSection}
                    >
                        <h3>{tab.heading}</h3>
                        {tab.paragraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Campaign;
