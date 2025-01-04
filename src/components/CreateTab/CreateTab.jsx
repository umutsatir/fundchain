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

const CreateTab = ({ handleNotification }) => {
    const [activeTab, setActiveTab] = useState("basics");
    const [isSaved, setIsSaved] = useState(false);
    const [formData, setFormData] = useState({
        basics: {
            category: "",
            title: "",
            location: "",
            image: "",
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

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleSave = async () => {
        try {
            console.log(formData);
            const errors = [];
            let isStoryTyped = true;
            formData.story.story.forEach((data) => {
                if (data.title == "" || data.paragraphs[0] == "")
                    isStoryTyped = false;
            });

            if (!formData.basics.category) errors.push("category");
            if (!formData.basics.title) errors.push("title");
            if (!formData.basics.location) errors.push("location");
            if (!formData.basics.image) errors.push("image");
            if (
                !formData.basics.duration.type ||
                !formData.basics.duration.value
            ) {
                errors.push("duration");
            }
            if (!formData.funding.amount) errors.push("funding amount");
            if (formData.story.story.length === 0 || !isStoryTyped)
                errors.push("story");
            if (!formData.basics.targetDate) errors.push("target date");

            if (errors.length > 0) {
                handleNotification(
                    `Please fill in the following fields:\n\n${errors.join(
                        ", "
                    )}`,
                    "error"
                );
                return;
            }

            handleNotification("Changes have been saved!", "success");
            setIsSaved(true);
        } catch (error) {
            alert("An error occurred: " + error.message);
        }
    };

    const handleCreate = async () => {
        // const formattedData = JSON.stringify(formData, null, 2);
        // const newWindow = window.open("", "_blank");
        // newWindow.document.write(`<pre>${formattedData}</pre>`);
        // newWindow.document.title = "Saved Data";
        // BACKEND API CALL
        // const response = await fetch("https://api.example.com/projects", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(formData),
        // });
        // if (response.ok) {
        //     alert("Changes have been saved!");
        // } else {
        //     alert("Failed to save changes.");
        // }
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
