import React from "react";
import styles from "./Intro.module.css"; // CSS Modules import
import "@fortawesome/fontawesome-free/css/all.min.css";
import Funding from "../Funding/Funding";
import MediaGallery from "../MediaGallery/MediaGallery";

const Intro = ({ project, handleNotification, mediaItems }) => {
    const getDeadline = (dbDate) => {
        if (!dbDate) return;
        const currentDate = new Date();
        const [year, month, day] = dbDate.split("-");
        const targetDate = new Date(year, month - 1, day);
        const diffInMs = targetDate.getTime() - currentDate.getTime();
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
                    <MediaGallery mediaItems={mediaItems} />
                </div>
                <Funding
                    id={project.id}
                    title={project.title}
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
