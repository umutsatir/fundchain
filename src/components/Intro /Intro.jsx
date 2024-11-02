import React from "react";
import "./Intro.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Intro = () => {
  return (
    <div className="intro">
      <div className="title">
        <h1>Title</h1>
      </div>

      <div className="video-funding-container">
        {/* Video section */}
        <div className="video">
          <video controls className="project-video">
            <source src="path_to_your_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* Funding section */}
        <div className="funding"></div>
      </div>

      <div className="info-container">
        <div className="info-item">
          <i className="fas fa-clock"></i>
          <span>Created 1 day ago</span>
        </div>
        <div className="divider"></div> {/* Dikey çizgi */}
        <div className="info-item">
          <i className="fas fa-user"></i>
          <span>Personal Use</span>
        </div>
        <div className="divider"></div> {/* Dikey çizgi */}
        <div className="info-item">
          <i className="fas fa-map-marker-alt"></i>
          <span>Kathmandu, Nepal</span>
        </div>
      </div>
    </div>
  );
};

export default Intro;
