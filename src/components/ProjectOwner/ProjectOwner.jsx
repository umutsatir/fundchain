import { useEffect, useState } from "react";
import "./ProjectOwner.css";
import $ from "jquery";

const ProjectOwner = ({ userId }) => {
    const rating = 4.5;
    const [user, setUser] = useState({});

    useEffect(() => {
        $.ajax({
            url: "http://localhost:8000/projectOwner.php",
            type: "GET",
            data: {
                id: userId,
            },
            success: function (data) {
                data = JSON.parse(data);
                if (data.status) setUser(data);
            },
            error: function (error) {
                console.log(error);
            },
        });
    }, [userId]);

    return (
        <div className="profile-card">
            <div className="profile-frame">
                <div className="profile-image">
                    <img src={user.profilePic} alt="Profile" />
                </div>
                <div className="profile-info">
                    <h2>{user.username}</h2>
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
                        {user.projectCount} created | {user.backedCount} backed
                    </p>
                </div>
            </div>
            <div className="profile-description">
                <p>{user.description}</p>
            </div>
        </div>
    );
};

export default ProjectOwner;
