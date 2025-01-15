import React, { useState } from "react";
import styles from "./CreateTab.module.css";
import Category from "../Category/Category";
import Story from "../Story/Story";
import Details from "../Details/Details";
import Location from "../Location/Location";
import Image from "../Image/Image";
import Video from "../Video/Video";
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
import { parseEther } from "viem";

const CreateTab = ({ handleNotification }) => {
    const [activeTab, setActiveTab] = useState("basics");
    const [isSaved, setIsSaved] = useState(false);
    const [isInProgress, setIsInProgress] = useState(false);
    const [imageData, setImageData] = useState([]);
    const [formData, setFormData] = useState({
        basics: {
            category: "",
            title: "",
            description: "",
            location: "",
            image: [],
            video: "",
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
    });
    const [warnings, setWarnings] = useState({
        details: null,
        location: null,
        duration: null,
        video: null,
        funding: null,
        story: null,
    });

    const isFormValid = () => {
        return !Object.values(warnings).some((warning) => warning);
    };

    const cookies = new Cookies();
    const { isConnected } = useAccount();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleSave = async () => {
        if (isFormValid()) {
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
                if (
                    formData.basics.image.length === 0 &&
                    imageData.length === 0
                )
                    errors.push("image");
                if (
                    !formData.basics.duration.type ||
                    !formData.basics.duration.value
                ) {
                    errors.push("duration");
                }
                if (!formData.funding.amount) errors.push("funding amount");
                if (
                    parseFloat(formData.funding.amount) <= 0 ||
                    parseFloat(formData.funding.amount) >= 250
                )
                    errors.push("funding");
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
        } else {
            handleNotification(
                "Please fill in the required fields correctly",
                "error"
            );
        }
    };

    const getDaysFromDuration = (duration) => {
        const date = new Date(duration);
        const currentDate = new Date();
        const timeDifference = date.getTime() - currentDate.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24);
        return Math.floor(daysDifference);
    };

    const capitalAllFirstLetters = (str) => {
        return str
            .split(" ")
            .map((word) => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(" ");
    };

    const uploadImages = async () => {
        try {
            // Upload files and get URLs
            const uploadPromises = imageData.map(async (file) => {
                const formData = new FormData();
                formData.append("image", file);

                const response = await fetch(apiUrl + "/uploadImage.php", {
                    method: "POST",
                    body: formData,
                });
                const data = await response.json();
                if (data.status) {
                    return data.url;
                } else {
                    handleNotification("Failed to upload images", "error");
                    throw new Error("Failed to upload images");
                }
            });
            const urls = await getLinks(uploadPromises);
            console.log("Image URLs:", urls);
            updateBasics("image", urls);
        } catch (error) {
            console.error("Image upload error:", error);
            handleNotification("Failed to upload images", "error");
        }
    };

    const getLinks = async (uploadPromises) => {
        try {
            const urls = await Promise.all(uploadPromises);
            return urls;
        } catch (error) {
            console.error("Error getting links:", error);
            throw error;
        }
    };

    const handleCreate = async () => {
        if (isFormValid()) {
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
                const timestamp = new Date().getTime() / 1000;
                const currDate = new Date();
                currDate.setDate(currDate.getDate() + parseInt(duration));
                const launchDate = currDate.toISOString().split("T")[0];

                const hash = await deployContract(config, {
                    abi: abi,
                    args: [
                        parseInt(timestamp + duration * 24 * 60 * 60),
                        parseEther(formData.funding.amount),
                    ],
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

                await uploadImages();

                setFormData((prevState) => {
                    const updatedFormData = {
                        ...prevState,
                        basics: {
                            ...prevState.basics,
                            location: capitalAllFirstLetters(
                                formData.basics.location
                            ),
                            title: capitalAllFirstLetters(
                                formData.basics.title
                            ),
                            video: formData.basics.video.split("v=")[1],
                        },
                    };
                    let newData = {
                        ...updatedFormData,
                        contractAddress: contractAddress,
                        username: cookies.get("username"),
                        launchDate: launchDate,
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
                            setIsInProgress(false);
                        },
                        error: function (error) {
                            console.log(error);
                            handleNotification(
                                "Failed to create project",
                                "error"
                            );
                            setIsInProgress(false);
                        },
                    });

                    return updatedFormData;
                });
            } catch (error) {
                console.error("Error while creating the project:", error);
                handleNotification(
                    "Failed to create project. Please try again.",
                    "error"
                );
                setIsInProgress(false);
            }
        } else {
            handleNotification(
                "Please fill in the required fields correctly",
                "error"
            );
        }
    };

    const updateWarnings = (key, value) => {
        setWarnings((prevState) => ({
            ...prevState,
            [key]: value,
        }));
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
            <BasicsTab
                updateBasics={updateBasics}
                formData={formData.basics}
                handleNotification={handleNotification}
                setImageData={setImageData}
                updateWarnings={updateWarnings}
            />
        ),
        funding: (
            <FundingTab
                updateFunding={updateFunding}
                formData={formData.funding}
                updateWarnings={updateWarnings}
            />
        ),
        story: (
            <StoryTab
                updateStory={updateStory}
                formData={formData.story}
                updateWarnings={updateWarnings}
                handleNotification={handleNotification}
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
                </div>
                <div className={styles.saveGroup}>
                    <button
                        className={styles.createButton}
                        onClick={handleCreate}
                        disabled={!isSaved}
                    >
                        Create
                    </button>
                    <button
                        className={styles.saveButton}
                        onClick={handleSave}
                        disabled={!isFormValid()}
                    >
                        Save All
                    </button>
                </div>
            </div>
            <div className={styles.content}>{tabs[activeTab]}</div>
        </div>
    );
};

const BasicsTab = ({
    updateBasics,
    formData,
    handleNotification,
    setImageData,
    updateWarnings,
}) => (
    <div>
        <Category updateBasics={updateBasics} formData={formData} />
        <Details
            updateBasics={updateBasics}
            formData={formData}
            setDetailsWarning={(value) => updateWarnings("details", value)}
        />
        <Location
            updateBasics={updateBasics}
            formData={formData}
            setLocationWarning={(value) => updateWarnings("location", value)}
        />
        <Image
            formData={formData}
            handleNotification={handleNotification}
            setImageData={setImageData}
        />
        <Video
            updateBasics={updateBasics}
            formData={formData}
            setVideoWarning={(value) => updateWarnings("video", value)}
        />
        <Duration
            updateBasics={updateBasics}
            formData={formData}
            setDurationWarning={(value) => updateWarnings("duration", value)}
        />
    </div>
);

const FundingTab = ({ updateFunding, formData, updateWarnings }) => (
    <div>
        <FundingGoal
            updateFunding={updateFunding}
            formData={formData}
            setFundingWarning={(value) => updateWarnings("funding", value)}
        />
    </div>
);

const StoryTab = ({
    updateStory,
    formData,
    updateWarnings,
    handleNotification,
}) => (
    <div>
        <Story
            updateStory={updateStory}
            formData={formData}
            setStoryWarning={(value) => updateWarnings("story", value)}
            handleNotification={handleNotification}
        />
    </div>
);

export default CreateTab;
