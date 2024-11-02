import { useEffect, useState } from "react";
import "./ProjectOwner.css";

const ProjectOwner = ({ name, rating, info }) => {
    const createdCount = 0;
    const backedCount = 0;

    return (
        <div className="profile-card">
            <div className="profile-frame">
                <div className="profile-image">
                    <img src="https://via.placeholder.com/80" alt="Profile" />
                </div>
                <div className="profile-info">
                    <h2>John Doe</h2>
                    <div className="rating">
                        {Array.from({ length: 5 }, (_, index) => {
                            const isFullStar =
                                index + 1 <= Math.floor(rating /* rating */);
                            const isHalfStar =
                                !isFullStar && index < rating; /* rating */

                            return (
                                <span
                                    key={index}
                                    className={`star ${
                                        isFullStar
                                            ? "full"
                                            : isHalfStar
                                            ? "half"
                                            : "empty"
                                    }`}
                                >
                                    ★
                                </span>
                            );
                        })}
                        <span className="rating-value">
                            ({rating /* rating */})
                        </span>
                    </div>
                    <p>
                        {createdCount} created | {backedCount} backed
                    </p>
                </div>
            </div>
            <div className="profile-description">
                <p>{info}</p>
            </div>
        </div>
    );
};

export default ProjectOwner;
