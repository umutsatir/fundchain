import React, { useState } from "react";
import styles from "./CommentCreate.module.css";

const CommentCreate = () => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment.trim() === "") {
      setError("Please enter a comment.");
      setSuccessMessage("");
    } else {
      setError("");
      setSuccessMessage("Your comment has been submitted.");
      setComment("");
    }
  };

  return (
    <div className={styles.commentCreateContainer}>
      <textarea
        className={styles.commentText}
        placeholder="Write your comment here..."
        value={comment}
        onChange={handleCommentChange}
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}{" "}
      <button className={styles.submitButton} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default CommentCreate;
