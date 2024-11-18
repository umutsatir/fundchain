import React from "react";
import "./ProfilePage.css";

function ProfilePage() {
  const user = {
    name: "Umut",
    surname: "Satır",
    biography: "Let people know more about you.",
    location: "Şehir, Ülke",
    profileImage: "https://via.placeholder.com/150",
    coverImage: "https://via.placeholder.com/1200x400",
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div
          className="profile-cover"
          style={{ backgroundImage: `url(${user.coverImage})` }}
        >
          <div className="profile-image">
            <img src={user.profileImage} alt={`${user.name} ${user.surname}`} />
          </div>
        </div>

        <div className="profile-name">
          <h2>
            {user.name} {user.surname}
          </h2>
        </div>
      </div>

      <div className="info-container">
        <div className="info-item">
          <strong>Location</strong> <p>{user.location}</p>
        </div>
        <div className="line"></div>

        <div className="info-item">
          <strong>Biography</strong> <p>{user.biography}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
