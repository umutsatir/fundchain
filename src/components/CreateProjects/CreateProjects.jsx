import React, { useState } from "react";
import styles from "./CreateProjects.module.css";

import MyProjects from "../MyProjects/MyProjects";
import Donations from "../Donations/Donations";

import photop from "/public/profilePicture.png"; //temporarily added.

const CreateProjects = () => {
    const [activeTab, setActiveTab] = useState("My Projects");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className={styles.container}>
            <div className={styles.tabGroup}>
                <button
                    className={`${
                        activeTab === "My Projects" ? styles.activeTab : ""
                    }`}
                    onClick={() => handleTabClick("My Projects")}
                >
                    My Projects
                </button>
                <button
                    className={`${
                        activeTab === "Donations" ? styles.activeTab : ""
                    }`}
                    onClick={() => handleTabClick("Donations")}
                >
                    Donations
                </button>  
            </div>

            <div className={styles.content}>
                {activeTab === "My Projects" && <MyProjectsTab />}
                {activeTab === "Donations" && <DonationsTab />}
            </div>
        </div>
    );
};


const MyProjectsTab = () => (
    <div>
        <MyProjects 
            title="Project Name0"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus quisquam in consequatur unde iste harum nesciunt corporis deleniti. Iste, accusantium?"
            backers={59}
            photo={photop}
            buttonName="Button"
            deadline={"2025-01-20T23:59:59Z"}>
        </MyProjects>

        <MyProjects 
            title="Project Name1"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus quisquam in consequatur unde iste harum nesciunt corporis deleniti. Iste, accusantium?"
            backers={195}
            photo={photop}
            buttonName="Button"
            deadline={"2024-12-27T23:59:59Z"}>
        </MyProjects>
    </div>
);

const DonationsTab = () => (
    <div>
        <Donations 
            title="Donation Project Name1"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus quisquam in consequatur unde iste harum nesciunt corporis deleniti. Iste, accusantium?"
            backers={190}
            photo={photop}
            buttonName="Button"
            deadline={"2024-12-27T23:59:59Z"}>
        </Donations>

        <Donations 
            title="Donation Project Name0"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus quisquam in consequatur unde iste harum nesciunt corporis deleniti. Iste, accusantium?"
            backers={29}
            photo={photop}
            buttonName="Button"
            deadline={"2025-01-17T23:59:59Z"}>
        </Donations>
    </div>
);

export default CreateProjects;
