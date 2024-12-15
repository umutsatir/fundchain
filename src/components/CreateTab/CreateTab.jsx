import React, { useState } from "react";
import styles from "./CreateTab.module.css";
import Category from "../Category/Category";
import Story from "../Story/Story";
import Collaborators from "../Collaborators/Collaborators";
import Details from "../Details/Details";
import Location from "../Location/Location";
import Image from "../Image/Image";
import Video from "../Video/Video";
import TargetDate from "../TargetDate/TargetDate";
import Duration from "../Duration/Duration";
import FundingGoal from "../FundingGoal/FundingGoal";

const CreateTab = () => {
    const [activeTab, setActiveTab] = useState("basics");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleSave = () => {
        alert("Changes have been saved!");
    };

    return (
        <div className={styles.container}>
            <div className={styles.tabs}>
                <div className={styles.tabGroup}>
                    <button
                        className={`${
                            activeTab === "basics" ? styles.activeTab : ""
                        }`}
                        onClick={() => handleTabClick("basics")}
                    >
                        Basics
                    </button>
                    <button
                        className={`${
                            activeTab === "funding" ? styles.activeTab : ""
                        }`}
                        onClick={() => handleTabClick("funding")}
                    >
                        Funding
                    </button>
                    <button
                        className={`${
                            activeTab === "story" ? styles.activeTab : ""
                        }`}
                        onClick={() => handleTabClick("story")}
                    >
                        Story
                    </button>
                    <button
                        className={`${
                            activeTab === "collaborators" ? styles.activeTab : ""
                        }`}
                        onClick={() => handleTabClick("collaborators")}
                    >
                        Collaborators
                    </button>
                </div>
                <button className={styles.saveButton} onClick={handleSave}>
                    Save
                </button>
            </div>
            <div className={styles.content}>
                {activeTab === "basics" && <BasicsTab />}
                {activeTab === "funding" && <FundingTab />}
                {activeTab === "story" && <StoryTab />}
                {activeTab === "collaborators" && <CollaboratorsTab />}
            </div>
        </div>
    );
};


const BasicsTab = () => (
    <div>
        <Category />
        <Details />
        <Location />
        <Image />
        <Video />
        <TargetDate />
        <Duration />
    </div>
);

const StoryTab = () => (
    <div>
        <Story />
    </div>
);

const CollaboratorsTab = () => (
    <div>
        <Collaborators/>
    </div>
);

const FundingTab = () => (
    <div>
        <FundingGoal />
    </div>
);

export default CreateTab;
