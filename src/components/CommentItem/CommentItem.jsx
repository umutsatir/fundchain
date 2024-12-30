import React from "react";
import styles from "./CommentItem.module.css";

const CommentItem = ({ comment }) => {
    const profileImageUrl = comment.profilePic_php;
    const name = comment.name_php;
    const surname = comment.surname_php;
    // const timeAgo = getDeadline(comment.creationDate_php);
    const timeAgo = "Just now";
    const getInitials = (name, surname) => {
        const nameInitial =
            name && name.trim() ? name.charAt(0).toUpperCase() : "U";
        const surnameInitial =
            surname && surname.trim() ? surname.charAt(0).toUpperCase() : "S";
        return `${nameInitial}${surnameInitial}`;
    };

    const getDeadline = (dbDate) => {
        const currentDate = new Date(); // Current date
        const targetDate = new Date(dbDate); // Date from the database

        // Calculate the difference in milliseconds
        const diffInMs = targetDate - currentDate;

        // Convert milliseconds to days
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        return diffInDays > 0
            ? `${diffInDays} day(s) remaining`
            : `${Math.abs(diffInDays)} day(s) ago`;
    };

    const profileImageContent = profileImageUrl ? (
        <img
            src={profileImageUrl}
            alt={`${name} ${surname}`}
            className={styles.profileImage}
        />
    ) : (
        <div className={styles.profileImage}>{getInitials(name, surname)}</div>
    );

    const displayName = name || "Umut";
    const displaySurname = surname || "Satır";
    const displayComment = comment || "This is a default comment content.";
    const displayTimeAgo = timeAgo || "Just now";

    return (
        <div className={styles.commentContainer}>
            <div className={styles.commentHeader}>
                <div className={styles.profileImageContainer}>
                    {profileImageContent}
                </div>
                <div className={styles.userInfo}>
                    <span className={styles.userName}>
                        {displayName} {displaySurname}
                    </span>
                    <span className={styles.timeAgo}>{displayTimeAgo}</span>
                </div>
            </div>
            <div className={styles.commentContent}>
                <p>{displayComment}</p>
            </div>
        </div>
    );
};

export default CommentItem;
