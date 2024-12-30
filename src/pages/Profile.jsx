import React from "react";
import { useState, useEffect } from "react";
import styles from "../styles/Profile.module.css"; // Import the CSS module
import { Cookies } from "react-cookie";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";

function Profile() {
    const [user, setUser] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        $.ajax({
            url: "http://localhost:8000/fundchain/api/profile.php",
            type: "POST",
            data: {
                username: cookies.get("username"),
            },
            success: function (result) {
                result = JSON.parse(result);
                if (result.status) {
                    setUser(result.data);
                } else {
                    console.log(result.message);
                }
            },
            error: function (error) {
                console.log(error);
                navigate("/error");
            },
        });

        $.ajax({
            url: "http://localhost:8000/fundchain/api/usersProjects.php",
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
        });

        setLoading(false);
    }, [loading]);

    const handleProjectClick = (id) => {
        navigate("/project/" + id);
    };

    return loading ? (
        <Loading />
    ) : (
        <div className={styles.profileWrapper}>
            <div className={styles.profileContainer}>
                <div
                    className={styles.profileCover}
                    style={{ backgroundImage: `url(${user.coverImage_php})` }}
                >
                    <div className={styles.profileImage}>
                        <img
                            src={user.profileImage_php}
                            alt={`${user.name_php} ${user.surname_php}`}
                        />
                    </div>
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
                            <a onClick={() => handleProjectClick(project.id)}>
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
