import React, { useState, useRef, useEffect } from "react";
import styles from "./ShareButton.module.css"; // Dosya adı Share.module.css

const Share = ({ isOpen, handleNotification }) => {
    const [copyMessage, setCopyMessage] = useState(""); // Mesaj durumu
    const modalRef = useRef(null);

    const handleSocialClick = (platform) => {
        const urlToShare = window.location.href; // Gerçek URL
        const message = "Check out this amazing project!"; // Default mesaj
        let shareUrl = "";

        switch (platform) {
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    urlToShare
                )}`;
                break;
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    message
                )}&url=${encodeURIComponent(urlToShare)}`;
                break;
            /*
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          urlToShare
        )}&title=${encodeURIComponent(message)}`;
        break;
        */
            case "whatsapp":
                shareUrl = `https://wa.me/?text=${encodeURIComponent(
                    message + " " + urlToShare
                )}`;
                break;
            default:
                return;
        }
        window.open(shareUrl, "_blank");
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            handleNotification("Link copied to clipboard", "success");
        });
    };

    return (
        <div style={{ position: "relative" }}>
            {isOpen && (
                <div ref={modalRef} className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.socialButtons}>
                            <div
                                className={`${styles.socialBtn} ${styles.facebook}`}
                                onClick={() => handleSocialClick("facebook")}
                            >
                                <i className="fab fa-facebook-f"></i>
                            </div>
                            <div
                                className={`${styles.socialBtn} ${styles.twitter}`}
                                onClick={() => handleSocialClick("twitter")}
                            >
                                <i className="fab fa-twitter"></i>
                            </div>
                            {/*
              <div
                className={`${styles.socialBtn} ${styles.linkedin}`}
                onClick={() => handleSocialClick("linkedin")}
              >
                <i className="fab fa-linkedin-in"></i>
              </div>
              */}
                            <div
                                className={`${styles.socialBtn} ${styles.whatsapp}`}
                                onClick={() => handleSocialClick("whatsapp")}
                            >
                                <i className="fab fa-whatsapp"></i>
                            </div>
                            <div
                                className={`${styles.socialBtn} ${styles.copyLink}`}
                                onClick={handleCopyLink}
                            >
                                <i className="fas fa-link"></i>
                            </div>
                        </div>
                        {copyMessage && (
                            <div className={styles.copyMessage}>
                                {copyMessage}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Share;
