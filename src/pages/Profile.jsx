import React from "react";
import "../styles/Profile.css";

function Profile() {
    const user = {
        name: "Umut",
        surname: "Satır",
        biography: "Let people know more about you.",
        location: "Şehir, Ülke",
        profileImage: "https://via.placeholder.com/150",
        coverImage: "https://via.placeholder.com/1200x400",
    };

    return (
        <div className="Pprofile-wrapper">
            <div className="Pprofile-container">
                <div
                    className="Pprofile-cover"
                    style={{ backgroundImage: `url(${user.coverImage})` }}
                >
                    <div className="Pprofile-image">
                        <img
                            src={user.profileImage}
                            alt={`${user.name} ${user.surname}`}
                        />
                    </div>
                </div>
                <div className="Pprofile-name">
                    <h2>
                        {user.name} {user.surname}
                    </h2>
                </div>
            </div>
            <div className="infos-container">
                <div className="infos-item">
                    <strong>Location</strong> <p>{user.location}</p>
                </div>
                <div className="line"></div>
                <div className="infos-item">
                    <strong>Biography</strong> <p>{user.biography}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
