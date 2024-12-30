import React from "react";
import styles from "./TabBar.module.css"; // Import the CSS Module

function TabBar({ activeTab, setActiveTab }) {
    return (
        <div className={styles.tabBar}>
            <div className={`${styles.tabBarLine} ${styles.topLine}`} />{" "}
            {/* Top line */}
            <div className={styles.tabs}>
                <div
                    className={`${styles.tab} ${
                        activeTab === "Campaign" ? styles.tabActive : ""
                    }`}
                    onClick={() => setActiveTab("Campaign")}
                >
                    Campaign
                </div>
                <div
                    className={`${styles.tab} ${
                        activeTab === "Comments" ? styles.tabActive : ""
                    }`}
                    onClick={() => setActiveTab("Comments")}
                >
                    Comments
                </div>

                <div
                    className={styles.indicator}
                    style={{
                        left:
                            activeTab === "Campaign"
                                ? "5px"
                                : "calc(100px + 10px)",
                        width: "100px",
                    }}
                ></div>
            </div>
            <div className={`${styles.tabBarLine} ${styles.bottomLine}`} />{" "}
            {/* Bottom line */}
        </div>
    );
}

export default TabBar;
