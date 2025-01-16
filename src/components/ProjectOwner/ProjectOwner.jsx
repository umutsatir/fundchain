import { useEffect, useState } from "react";
import styles from "./ProjectOwner.module.css"; // import the module CSS
import $ from "jquery";
import { apiUrl } from "../../api_url";

const ProjectOwner = ({ userId }) => {
    const [user, setUser] = useState({});
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (!userId) return;
        $.ajax({
            url: apiUrl + "/projectOwner.php",
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

        $.ajax({
            url: apiUrl + "/getTotalRate.php",
            type: "GET",
            data: {
                userId: userId,
            },
            success: function (result) {
                result = JSON.parse(result);
                if (result.status) setRating(result.data);
            },
            error: function (error) {
                console.log(error);
            },
        });
    }, [userId]);

    return (
        <div className={styles.profileCard}>
            <div className={styles.profileFrame}>
                <div className={styles.profileImage}>
                    <img src={user.profilePic} alt="Profile" />
                </div>
                <div className={styles.profileInfo}>
                    <h2>{user.username}</h2>
                    <div className={styles.rating}>
                        {Array.from({ length: 5 }, (_, index) => {
                            const isFullStar = index + 1 <= Math.floor(rating);
                            const isHalfStar = !isFullStar && index < rating;

                            return (
                                <span
                                    key={index}
                                    className={`${styles.star} ${
                                        isFullStar
                                            ? styles.full
                                            : isHalfStar
                                            ? styles.half
                                            : styles.empty
                                    }`}
                                >
                                    ★
                                </span>
                            );
                        })}
                        <span className={styles.ratingValue}>({rating})</span>
                    </div>
                    <p>
                        {user.projectCount} created | {user.backedCount} backed
                    </p>
                </div>
            </div>
            <div className={styles.profileDescription}>
                <p>{user.description}</p>
            </div>
        </div>
    );
};

export default ProjectOwner;
