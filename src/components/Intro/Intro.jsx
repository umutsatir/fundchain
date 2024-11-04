import React from "react";
import "./Intro.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Funding from "../Funding/Funding";

const Intro = ({ project }) => {
    function getDeadline(dbDate) {
        const currentDate = new Date(); // Current date
        const targetDate = new Date(dbDate); // Date from the database

        // Calculate the difference in milliseconds
        const diffInMs = targetDate - currentDate;

        // Convert milliseconds to days
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        return diffInDays;
    }

    return (
        <div className="intro">
            <div className="title">
                <h1>{project.title}</h1>
                <p>{project.description}</p>
            </div>

            <div className="video-funding-container">
                {/* Video section */}
                <div className="video">
                    <video controls className="project-video">
                        <source src="path_to_your_video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <Funding />
            </div>

            <div className="info-container">
                <div className="info-item">
                    <i className="fas fa-clock"></i>
                    <span>
                        Created {getDeadline(project.launchDate)} day(s) ago
                    </span>
                </div>
                <div className="divider"></div> {/* Dikey çizgi */}
                <div className="info-item">
                    <i className="fas fa-user"></i>
                    <span>{project.category}</span>
                </div>
                <div className="divider"></div> {/* Dikey çizgi */}
                <div className="info-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{project.location}</span>
                </div>
            </div>
        </div>
    );
};

export default Intro;
