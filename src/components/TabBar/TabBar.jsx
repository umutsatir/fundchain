// TabBar.jsx

import React, { useState } from 'react';
import './TabBar.css';

function TabBar() {
    const [activeTab, setActiveTab] = useState("Campaign");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="tab-bar">
            <div className="line top-line" /> {/* Üst çizgi */}
            <div className="tabs">
                <div
                    className={`tab ${activeTab === "Campaign" ? "active" : ""}`}
                    onClick={() => handleTabClick("Campaign")}
                >
                    Campaign
                </div>
                <div
                    className={`tab ${activeTab === "Comments" ? "active" : ""}`}
                    onClick={() => handleTabClick("Comments")}
                >
                    Comments
                </div>

                <div className="indicator" style={{ left: activeTab === "Campaign" ? "20px" : "calc(10% + 40px)", width: "10%" }}></div>

            </div>
            <div className="line bottom-line" /> {/* Alt çizgi */}
        </div>
    );
}

export default TabBar;
