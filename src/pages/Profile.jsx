import React from "react";
import { useState, useEffect } from "react";
import styles from "../styles/Profile.module.css"; // Import the CSS module
import { Cookies } from "react-cookie";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { apiUrl } from "../api_url";

function Profile({ handleNotification }) {
    const [user, setUser] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true); // Set loading to true before making requests

        $.ajax({
            url: apiUrl + "/profile.php",
            type: "POST",
            data: {
                username: cookies.get("username"),
            },
            success: function (result) {
                result = JSON.parse(result);
                if (result.status) {
                    setUser(result.data);
                } else {
                    handleNotification(result.message, "error");
                }
            },
            error: function (error) {
                console.log(error);
                navigate("/error");
            },
        });

        $.ajax({
            url: apiUrl + "/usersProjects.php",
            type: "POST",
            data: {
                username: cookies.get("username"),
            },
            success: function (result) {
                result = JSON.parse(result);
                if (result.status) {
                    setProjects(result.data);
                } else {
                    console.log(result.message);
                }
            },
            error: function (error) {
                console.log(error);
                navigate("/error");
            },
            complete: function () {
                setLoading(false); // Set loading to false after requests are completed
            },
        });
    }, []);

    const handleProjectClick = (id) => {
        navigate("/project/" + id);
    };

    const getInitials = (name, surname) => {
        const nameInitial = name && name.charAt(0).toUpperCase();
        const surnameInitial = surname && surname.charAt(0).toUpperCase();
        return `${nameInitial}${surnameInitial}`;
    };

    const profileImageContent = user.profileImage_php ? (
        <img
            src={user.profileImage_php}
            alt={`${user.name_php} ${user.surname_php}`}
            className={styles.profileImage}
        />
    ) : (
        <div className={styles.profileImage}>
            {user.name_php && user.surname_php
                ? getInitials(user.name_php, user.surname_php)
                : getInitials(user.username_php, "")}
        </div>
    );

    return loading ? (
        <Loading />
    ) : (
        <div className={styles.profileWrapper}>
            <div className={styles.profileContainer}>
                <div
                    className={styles.profileCover}
                    style={{ backgroundImage: `url(${user.coverImage_php})` }}
                >
                    {profileImageContent}
                </div>
                <div className={styles.profileName}>
                    <h2>
                        {user.name_php} {user.surname_php}
                    </h2>
                </div>
            </div>
            <div className={styles.infosContainer}>
                <div className={styles.infosItem}>
                    <p className={styles.infoHeader}>
                        <strong>Username</strong>
                    </p>
                    <p className={styles.infoDesc}>{user.username_php}</p>
                </div>
                <div className={styles.line}></div>
                <div className={styles.infosItem}>
                    <p className={styles.infoHeader}>
                        <strong>Location</strong>
                    </p>
                    <p className={styles.infoDesc}>{user.location_php}</p>
                </div>
                <div className={styles.line}></div>
                <div className={styles.infosItem}>
                    <p className={styles.infoHeader}>
                        <strong>Biography</strong>
                    </p>
                    <p className={styles.infoDesc}>{user.biography_php}</p>
                </div>
                <div className={styles.line}></div>
                <div className={styles.infosItem}>
                    <p className={styles.infoHeader}>
                        <strong>Created Projects</strong>
                    </p>
                    {projects.map((project) => {
                        return (
                            <a
                                key={project.id}
                                onClick={() => handleProjectClick(project.id)}
                            >
                                {project.title}
                            </a>
                        );
                    })}
                </div>
                <div className={styles.line}></div>
                <div className={styles.infosItem}>
                    <p className={styles.infoHeader}>
                        <strong>Funded Project Count</strong>
                    </p>
                    <p className={styles.infoDesc}>{user.totalFund_php}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
