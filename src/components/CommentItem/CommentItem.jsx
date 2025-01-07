import React from "react";
import styles from "./CommentItem.module.css";

const CommentItem = ({ comment }) => {
    const profileImageUrl = comment.profile_pic;
    const name = comment.name;
    const surname = comment.surname;
    const timeAgo = getDeadline(comment.creationDate_php);
    const getInitials = (name, surname) => {
        const nameInitial = name && name.charAt(0).toUpperCase();
        const surnameInitial = surname && surname.charAt(0).toUpperCase();
        return `${nameInitial}${surnameInitial}`;
    };

    const getDeadline = (dbDate) => {
        if (!dbDate) return;
        const currentDate = new Date();
        const [year, month, day] = dbDate.split("-");
        const targetDate = new Date(year, month - 1, day);
        const diffInMs = targetDate.getTime() - currentDate.getTime();
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

    const displayName = name;
    const displaySurname = surname;
    const displayComment = comment;
    const displayTimeAgo = timeAgo;

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
