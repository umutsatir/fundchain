import React, { useState } from "react";
import styles from "./CommentCreate.module.css";
import { apiUrl } from "../../api_url";
import { Cookies } from "react-cookie";
import $ from "jquery";
import StarRating from "../StarRating/StarRating";

const CommentCreate = ({
    projectId,
    handleNotification,
    handleCommentRefresh,
}) => {
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const cookies = new Cookies();

    const onRate = (rating) => {
        setRating(rating);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (comment.trim() === "" || title.trim() === "" || rating === 0) {
            handleNotification(
                "Please fill all the fields for sending a comment",
                "error"
            );
        } else {
            createComment();
            setComment("");
            setTitle("");
        }
    };

    const createComment = async () => {
        $.ajax({
            url: apiUrl + "/createComment.php",
            type: "POST",
            data: {
                username: cookies.get("username"),
                projectId: projectId,
                description: comment,
                title: title,
                rate: rating,
            },
            success: function (result) {
                result = JSON.parse(result);
                if (result.status) {
                    handleNotification(
                        "Comment created successfully",
                        "success"
                    );
                    handleCommentRefresh();
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
                className={styles.titleText}
                type="text"
                placeholder="Title"
                value={title}
                id="title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className={styles.commentText}
                placeholder="Write your comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <StarRating onRate={onRate} />
            <button className={styles.submitButton} onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

export default CommentCreate;
