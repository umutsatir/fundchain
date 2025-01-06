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
import $ from "jquery";
import { apiUrl } from "../../api_url";
import { Cookies } from "react-cookie";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt, deployContract } from "@wagmi/core";
import { abi } from "../../../contracts/abi/abi";
import { bytecode } from "../../../contracts/bytecode/bytecode";
import { config } from "../../config";
import { sepolia } from "viem/chains";

const CreateTab = ({ handleNotification }) => {
    const [activeTab, setActiveTab] = useState("basics");
    const [isSaved, setIsSaved] = useState(false);
    const [isInProgress, setIsInProgress] = useState(false);
    const [formData, setFormData] = useState({
        basics: {
            category: "",
            title: "",
            description: "",
            location: "",
            image: [],
            video: "",
            targetDate: "",
            duration: {
                type: "",
                value: "",
            },
        },
        funding: {
            currency: "USD",
            amount: "",
        },
        story: {
            story: [],
        },
        collaborators: {
            collaborators: [],
        },
    });
    const cookies = new Cookies();
    const { isConnected } = useAccount();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleSave = async () => {
        try {
            const errors = [];
            let isStoryTyped = true;
            formData.story.story.forEach((data) => {
                if (data.title == "" || data.paragraphs[0] == "")
                    isStoryTyped = false;
            });

            if (!formData.basics.category) errors.push("category");
            if (!formData.basics.title) errors.push("title");
            if (!formData.basics.description) errors.push("description");
            if (!formData.basics.location) errors.push("location");
            if (formData.basics.image.length === 0) errors.push("image");
            if (
                !formData.basics.duration.type ||
                !formData.basics.duration.value
            ) {
                errors.push("duration");
            }
            if (!formData.funding.amount) errors.push("funding amount");
            if (formData.story.story.length === 0 || !isStoryTyped)
                errors.push("story");

            if (errors.length > 0) {
                handleNotification(
                    `Please fill in the following fields:\n\n${errors.join(
                        ", "
                    )}`,
                    "error"
                );
                return;
            }
            if (formData.basics.description.length > 85) {
                handleNotification(
                    "Description should not exceed 85 characters",
                    "error"
                );
            }

            handleNotification("Changes have been saved!", "success");
            setIsSaved(true);
        } catch (error) {
            alert("An error occurred: " + error.message);
        }
    };

    const getDaysFromDuration = (duration) => {
        const date = new Date(duration);
        const currentDate = new Date();
        const timeDifference = date.getTime() - currentDate.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24);
        return Math.floor(daysDifference);
    };

    const handleCreate = async () => {
        if (isInProgress) {
            handleNotification(
                "You can only create the same project once.",
                "warning"
            );
            return;
        }
        if (!isConnected) {
            handleNotification("Please connect your wallet first", "info");
            return;
        }
        setIsInProgress(true);

        try {
            handleNotification(
                "Please wait for the transaction to complete. This may take a few seconds.",
                "info"
            );
            const duration =
                formData.basics.duration.type === "fixed"
                    ? formData.basics.duration.value
                    : getDaysFromDuration(formData.basics.duration.value);
            const timestamp = Math.floor(Date.now() / 1000);

            const hash = await deployContract(config, {
                abi: abi,
                args: [timestamp + duration, formData.funding.amount],
                bytecode: bytecode,
                gas: 3000000,
            });
            const receipt = await waitForTransactionReceipt(config, {
                hash: hash,
            });
            const contractAddress = receipt.contractAddress;
            handleNotification(
                "Contract created successfully, waiting for project creation.",
                "info"
            );
            let newData = {
                ...formData,
                contractAddress: contractAddress,
                username: cookies.get("username"),
            };
            newData = JSON.stringify(newData);

            $.ajax({
                url: apiUrl + "/createProject.php",
                type: "POST",
                data: {
                    data: newData,
                },
                success: function (data) {
                    data = JSON.parse(data);
                    if (data.status) {
                        handleNotification(data.message, "success");
                    } else {
                        handleNotification(data.message, "error");
                    }
                },
                error: function (error) {
                    console.log(error);
                    handleNotification("Failed to create project", "error");
                },
            });
        } catch (error) {
            console.error("Error while creating the project:", error);
            handleNotification(
                "Failed to create project. Please try again.",
                "error"
            );
        }
    };

    const updateBasics = (key, value) => {
        setFormData((prevState) => ({
            ...prevState,
            basics: {
                ...prevState.basics,
                [key]: value,
            },
        }));
    };

    const updateStory = (key, value) => {
        setFormData((prevState) => ({
            ...prevState,
            story: {
                ...prevState.story,
                [key]: value,
            },
        }));
    };

    const updateCollaborators = (key, value) => {
        setFormData((prevState) => ({
            ...prevState,
            collaborators: {
                ...prevState.collaborators,
                [key]: value,
            },
        }));
    };

    const updateFunding = (key, value) => {
        setFormData((prevState) => ({
            ...prevState,
            funding: {
                ...prevState.funding,
                [key]: value,
            },
        }));
    };

    const tabs = {
        basics: (
            <BasicsTab updateBasics={updateBasics} formData={formData.basics} />
        ),
        funding: (
            <FundingTab
                updateFunding={updateFunding}
                formData={formData.funding}
            />
        ),
        story: <StoryTab updateStory={updateStory} formData={formData.story} />,
        collaborators: (
            <CollaboratorsTab
                updateCollaborators={updateCollaborators}
                formData={formData.collaborators}
            />
        ),
    };

    <div className={styles.content}>{tabs[activeTab]}</div>;

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
                            activeTab === "collaborators"
                                ? styles.activeTab
                                : ""
                        }`}
                        onClick={() => handleTabClick("collaborators")}
                    >
                        Collaborators
                    </button>
                </div>
                <div className={styles.saveGroup}>
                    <button
                        className={styles.createButton}
                        onClick={handleCreate}
                        disabled={!isSaved}
                    >
                        Create
                    </button>
                    <button className={styles.saveButton} onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
            <div className={styles.content}>{tabs[activeTab]}</div>
        </div>
    );
};

const BasicsTab = ({ updateBasics, formData }) => (
    <div>
        <Category updateBasics={updateBasics} formData={formData} />
        <Details updateBasics={updateBasics} formData={formData} />
        <Location updateBasics={updateBasics} formData={formData} />
        <Image updateBasics={updateBasics} formData={formData} />
        <Video updateBasics={updateBasics} formData={formData} />
        <TargetDate updateBasics={updateBasics} formData={formData} />
        <Duration updateBasics={updateBasics} formData={formData} />
    </div>
);

const FundingTab = ({ updateFunding, formData }) => (
    <div>
        <FundingGoal
            category={"tech"}
            updateFunding={updateFunding}
            formData={formData}
        />
    </div>
);

const StoryTab = ({ updateStory, formData }) => (
    <div>
        <Story updateStory={updateStory} formData={formData} />
    </div>
);

const CollaboratorsTab = ({ updateCollaborators, formData }) => (
    <div>
        <Collaborators
            updateCollaborators={updateCollaborators}
            formData={formData}
        />
    </div>
);

export default CreateTab;
