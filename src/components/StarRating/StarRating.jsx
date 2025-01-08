import React, { useState } from "react";
import styles from "./StarRating.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const StarRating = ({ onRate }) => {
    const [hoverIndex, setHoverIndex] = useState(0); // Tracks hovered star index
    const [isHovered, setIsHovered] = useState(false); // Tracks if the mouse is hovering
    const [hoverHalf, setHoverHalf] = useState(""); // Tracks hovered half star
    const [selectedRating, setSelectedRating] = useState(0); // Tracks selected rating

    const handleRating = (rating) => {
        if (hoverHalf === "left") rating -= 0.5;
        setSelectedRating(rating);
        if (onRate) onRate(rating); // Pass the selected rating back
    };

    const handleStarStyle = (index) => {
        if (isHovered) {
            if (hoverIndex >= index) {
                return hoverHalf === "left" && hoverIndex === index
                    ? "fa-regular fa-star-half-stroke"
                    : "fa-solid fa-star";
            }
            return "fa-regular fa-star";
        }

        if (selectedRating >= index) {
            return "fa-solid fa-star";
        }

        return selectedRating === index - 0.5
            ? "fa-regular fa-star-half-stroke"
            : "fa-regular fa-star";
    };

    const handleMouseEnter = (e, i) => {
        setIsHovered(true);
        const starWidth = e.target.offsetWidth;
        const mouseX = e.clientX - e.target.getBoundingClientRect().left;

        // Determine if the mouse is on the left or right half of the star
        if (mouseX < starWidth / 2) {
            setHoverHalf("left");
        } else {
            setHoverHalf("right");
        }
        setHoverIndex(i);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setHoverIndex(0);
        setHoverHalf("");
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <div
                    key={i}
                    className={styles.starContainer}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={(e) => handleMouseEnter(e, i)}
                    onClick={() => handleRating(i)}
                >
                    <i
                        className={`fa ${handleStarStyle(i)} ${styles.star}`}
                    ></i>
                </div>
            );
        }
        return stars;
    };

    return <div className={styles.ratingContainer}>{renderStars()}</div>;
};

export default StarRating;
