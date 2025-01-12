import React, { useEffect, useState } from "react";
import styles from "./CreateProjects.module.css";
import MyProjects from "../MyProjects/MyProjects";
import Donations from "../Donations/Donations";
import $ from "jquery";
import { Cookies } from "react-cookie";
import { apiUrl } from "../../api_url";

import Loading from "../Loading/Loading";

const CreateProjects = ({ handleNotification }) => {
    const [activeTab, setActiveTab] = useState("My Projects");
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [onChange, setOnChange] = useState(0);
    const cookies = new Cookies();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        setIsLoading(true);
        if (activeTab === "My Projects") {
            $.ajax({
                url: apiUrl + "/getProjects.php",
                type: "POST",
                data: {
                    username: cookies.get("username"),
                },
                success: function (result) {
                    result = JSON.parse(result);
                    if (result.status) {
                        setProjects(result.data);
                    } else {
                        handleNotification(result.message, "error");
                        setProjects([]);
                    }
                },
                error: function (error) {
                    console.log(error);
                    setProjects([]);
                },
            });
        } else {
            $.ajax({
                url: apiUrl + "/getDonations.php",
                type: "POST",
                data: {
                    username: cookies.get("username"),
                },
                success: function (result) {
                    result = JSON.parse(result);
                    if (result.status) {
                        setProjects(result.data);
                    } else {
                        setProjects([]);
                    }
                },
                error: function (error) {
                    console.log(error);
                    setProjects([]);
                },
            });
        }
        setIsLoading(false);
    }, [activeTab, onChange]);

    return isLoading ? (
        <Loading />
    ) : (
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
                {activeTab === "My Projects" && (
                    <MyProjectsTab
                        projects={projects}
                        handleNotification={handleNotification}
                        setOnChange={setOnChange}
                    />
                )}
                {activeTab === "Donations" && (
                    <DonationsTab
                        donations={projects}
                        handleNotification={handleNotification}
                        setOnChange={setOnChange}
                    />
                )}
            </div>
        </div>
    );
};

const MyProjectsTab = ({ projects, handleNotification, setOnChange }) => (
    <div>
        {projects.length > 0 ? (
            projects.map((project) => (
                <MyProjects
                    key={project.projectId}
                    id={project.projectId}
                    title={project.title}
                    description={project.description}
                    backers={0}
                    photo={project.image}
                    contractAddress={project.contractAddress}
                    buttonName="Withdraw Funds"
                    deadline={project.launchDate}
                    handleNotification={handleNotification}
                    setOnChange={setOnChange}
                />
            ))
        ) : (
            <h1>No projects found</h1>
        )}
    </div>
);

const DonationsTab = ({ donations, handleNotification, setOnChange }) => (
    <div>
        {donations.length > 0 ? (
            donations.map((donation) => (
                <Donations
                    key={donation.projectId}
                    id={donation.projectId}
                    title={donation.title}
                    description={donation.description}
                    backers={0}
                    photo={donation.image}
                    contractAddress={donation.contractAddress}
                    buttonName="Withdraw Donate"
                    deadline={donation.launchDate}
                    handleNotification={handleNotification}
                    setOnChange={setOnChange}
                />
            ))
        ) : (
            <h1>No donations found</h1>
        )}
    </div>
);

export default CreateProjects;
