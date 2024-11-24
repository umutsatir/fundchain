import React from "react";
import styles from "../styles/Profile.module.css"; // Import the CSS module

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
        <div className={styles.profileWrapper}>
            <div className={styles.profileContainer}>
                <div
                    className={styles.profileCover}
                    style={{ backgroundImage: `url(${user.coverImage})` }}
                >
                    <div className={styles.profileImage}>
                        <img
                            src={user.profileImage}
                            alt={`${user.name} ${user.surname}`}
                        />
                    </div>
                </div>
                <div className={styles.profileName}>
                    <h2>
                        {user.name} {user.surname}
                    </h2>
                </div>
            </div>
            <div className={styles.infosContainer}>
                <div className={styles.infosItem}>
                    <strong>Location</strong> <p>{user.location}</p>
                </div>
                <div className={styles.line}></div>
                <div className={styles.infosItem}>
                    <strong>Biography</strong> <p>{user.biography}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
