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
    const [formData, setFormData] = useState({
        basics: {
            category: "",
            title: "",
            subtitle: "",
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
            story: "",
        },
        collaborators: {
            collaborators: [],
        },
    });

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    const handleNotification = (msg, type) => {
        setMessage(msg);
        setType(type);
    };

    const handleSave = async () => {
        try {
            const errors = [];

            if (!formData.basics.title) errors.push("Title is required.");
            if (!formData.basics.subtitle) errors.push("Subtitle is required.");
            if (!formData.basics.location) errors.push("Location is required.");
            if (!formData.basics.image) errors.push("Image is required.");
            if (
                !formData.basics.duration.type ||
                !formData.basics.duration.value
            ) {
                errors.push("Duration type and value are required.");
            }
            if (!formData.funding.amount)
                errors.push("Funding amount is required.");
            if (!formData.story.story) errors.push("Story is required.");

            // ADDITIONAL VALIDATION
            // if (!formData.basics.video) errors.push("Video is required.");
            // if (!formData.basics.targetDate) errors.push("Target date is required.");
            // if (formData.collaborators.collaborators.length === 0) {
            //     errors.push("At least one collaborator is required.");
            // }

            // if (errors.length > 0) {
            //     alert(`Please fill in the following fields:\n\n${errors.join("\n")}`);
            //     return;
            // }

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
        } catch (error) {
            alert("An error occurred: " + error.message);
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
                <button className={styles.saveButton} onClick={handleSave}>
                    Save
                </button>
            </div>
            <div className={styles.content}>
                {tabs[activeTab]}
                <div className={styles.notification}>
                    {message && (
                        <p className={type === "error" ? styles.error : ""}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
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
