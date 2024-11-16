import React from "react";
import "./ProfilePage.css";

function ProfilePage() {
  const user = {
    name: "Umut",
    surname: "Satır",
    biography: "Let people know more about you.",
    location: "Şehir, Ülke",
    profileImage: "https://via.placeholder.com/150", // Profil fotoğrafı için bir URL
    coverImage: "https://via.placeholder.com/1200x400", // Kapak fotoğrafı için bir URL
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        {/* Kapak Fotoğrafı */}
        <div
          className="profile-cover"
          style={{ backgroundImage: `url(${user.coverImage})` }}
        >
          {/* Profil Fotoğrafı */}
          <div className="profile-image">
            <img src={user.profileImage} alt={`${user.name} ${user.surname}`} />
          </div>
        </div>

        {/* Kullanıcı Adı ve Soyadı */}
        <div className="profile-name">
          <h2>
            {user.name} {user.surname}
          </h2>
        </div>
      </div>

      {/* Info Container */}
      <div className="info-container">
      <div className="info-item">
          <strong>Location</strong> <p>{user.location}</p>
          </div>
        {/* Line elementini location ile bio arasına ekliyoruz */}
        <div className="line"></div>
        
        {/* Biography başlığı ve içeriğini yan yana yerleştiriyoruz */}
        <div className="info-item">
          <strong>Biography</strong> <p>{user.biography}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
