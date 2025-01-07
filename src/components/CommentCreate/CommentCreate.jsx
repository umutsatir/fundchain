import React, { useState } from "react";
import styles from "./CommentCreate.module.css";
import { apiUrl } from "../../api_url";
import { Cookies } from "react-cookie";
import $ from "jquery";

const CommentCreate = ({ projectId, handleNotification }) => {
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const cookies = new Cookies();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (comment.trim() === "") {
            handleNotification("Comment cannot be empty", "error");
            setSuccessMessage("");
        } else {
            createComment();
            setComment("");
            setTitle("");
        }
    };

    const createComment = () => {
        $.ajax({
            url: apiUrl + "/createComment.php",
            type: "POST",
            data: {
                username: cookies.get("username"),
                projectId: projectId,
                description: comment,
                title: title,
                rate: 5,
            },
            success: function (result) {
                if (result.status) {
                    handleNotification(
                        "Comment created successfully",
                        "success"
                    );
                } else {
                    handleNotification(result.message, "error");
                }
            },
            error: function (error) {
                console.log(error);
                handleNotification(error, "error");
            },
        });
    };

    return (
        <div className={styles.commentCreateContainer}>
            <input
                type="text"
                placeholder="Title"
                id="title"
                className={styles.titleText}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className={styles.commentText}
                placeholder="Write your comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button className={styles.submitButton} onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

export default CommentCreate;
