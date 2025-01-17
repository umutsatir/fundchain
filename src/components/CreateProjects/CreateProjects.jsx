import React, { useEffect, useState } from "react";
import styles from "./CreateProjects.module.css";
import MyProjects from "../MyProjects/MyProjects";
import Donations from "../Donations/Donations";
import $ from "jquery";
import { Cookies } from "react-cookie";
import { apiUrl } from "../../api_url";
import { readContract } from "@wagmi/core";
import { config } from "../../config";
import { abi } from "../../../contracts/abi/abi";

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
        const fetchData = () => {
            const url =
                activeTab === "My Projects"
                    ? "/getProjects.php"
                    : "/getDonations.php";
            $.ajax({
                url: apiUrl + url,
                type: "POST",
                data: {
                    username: cookies.get("username"),
                },
                success: function (result) {
                    result = JSON.parse(result);
                    if (result.status) {
                        setProjects(result.data);
                    } else {
                        console.log(result.message);
                        setProjects([]);
                    }
                    setIsLoading(false);
                },
                error: function (error) {
                    console.log(error);
                    setProjects([]);
                    setIsLoading(false);
                },
            });
        };
        fetchData();
    }, [activeTab, onChange]);

    const getBackers = async (contractAddress) => {
        return await readContract(config, {
            abi,
            address: contractAddress,
            functionName: "getDonatorCount",
        });
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
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        {activeTab === "My Projects" && (
                            <MyProjectsTab
                                projects={projects}
                                handleNotification={handleNotification}
                                setOnChange={setOnChange}
                                getBackers={getBackers}
                            />
                        )}
                        {activeTab === "Donations" && (
                            <DonationsTab
                                donations={projects}
                                handleNotification={handleNotification}
                                setOnChange={setOnChange}
                                getBackers={getBackers}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

const getImageSrc = (image) => {
    return JSON.parse(image)[0];
};

const MyProjectsTab = ({
    projects,
    handleNotification,
    setOnChange,
    getBackers,
}) => (
    <div>
        {projects.length > 0 ? (
            projects.map((project) => (
                <MyProjects
                    key={project.projectId}
                    id={project.projectId}
                    title={project.title}
                    description={project.description}
                    getBackers={getBackers}
                    photo={getImageSrc(project.image)}
                    contractAddress={project.contractAddress}
                    buttonName="Withdraw Funds"
                    deadline={project.launchDate}
                    status={project.status}
                    handleNotification={handleNotification}
                    setOnChange={setOnChange}
                />
            ))
        ) : (
            <h1>No projects found</h1>
        )}
    </div>
);

const DonationsTab = ({
    donations,
    handleNotification,
    setOnChange,
    getBackers,
}) => (
    <div>
        {donations.length > 0 ? (
            donations.map((donation) => (
                <Donations
                    key={donation.projectId}
                    id={donation.projectId}
                    title={donation.title}
                    description={donation.description}
                    getBackers={getBackers}
                    photo={getImageSrc(donation.image)}
                    contractAddress={donation.contractAddress}
                    buttonName="Withdraw Donate"
                    deadline={donation.launchDate}
                    status={donation.status}
                    handleNotification={handleNotification}
                    setOnChange={setOnChange}
                    publicKey={donation.publicKey}
                />
            ))
        ) : (
            <h1>No donations found</h1>
        )}
    </div>
);

export default CreateProjects;
