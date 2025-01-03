import React from "react";
import styles from "./Intro.module.css"; // CSS Modules import
import "@fortawesome/fontawesome-free/css/all.min.css";
import Funding from "../Funding/Funding";

const Intro = ({ project, handleNotification }) => {
    const getDeadline = (dbDate) => {
        const currentDate = new Date(); // Current date
        const targetDate = new Date(dbDate); // Date from the database

        // Calculate the difference in milliseconds
        const diffInMs = targetDate - currentDate;

        // Convert milliseconds to days
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        return diffInDays > 0
            ? `${diffInDays} day(s) remaining`
            : `${Math.abs(diffInDays)} day(s) ago`;
    };

    return (
        <div className={styles.intro}>
            <div className={styles.title}>
                <h1>{project.title}</h1>
                <p>{project.description}</p>
            </div>

            <div className={styles.videoFundingContainer}>
                {/* Video section */}
                <div className={styles.video}>
                    <video controls className={styles.projectVideo}>
                        <source src="path_to_your_video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <Funding
                    id={project.id}
                    contractAddress={project.contractAddress}
                    handleNotification={handleNotification}
                />
            </div>

            <div className={styles.infoContainer}>
                <div className={styles.infoItem}>
                    <i className="fas fa-clock"></i>
                    <span>{getDeadline(project.launchDate)}</span>
                </div>
                <div className={styles.infoItem}>
                    <i className="fas fa-user"></i>
                    <span>{project.category}</span>
                </div>
                <div className={styles.infoItem}>
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{project.location}</span>
                </div>
            </div>
        </div>
    );
};

export default Intro;
