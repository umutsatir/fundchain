import React from "react";
import styles from "./CommentItem.module.css";

const CommentItem = ({ profileImageUrl, name, surname, comment, timeAgo }) => {
  const getInitials = (name, surname) => {
    const nameInitial =
      name && name.trim() ? name.charAt(0).toUpperCase() : "U";
    const surnameInitial =
      surname && surname.trim() ? surname.charAt(0).toUpperCase() : "S";
    return `${nameInitial}${surnameInitial}`;
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
