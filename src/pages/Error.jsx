import React from "react";
import styles from "../styles/Error.module.css"; // Import the CSS Module

function Error() {
    return (
        <div className={styles.errorContainer}>
            <h1 className={styles.errorMessage}>404 - Page Not Found</h1>
            <p className={styles.errorSubMessage}>
                Sorry, the page you are looking for does not exist.
            </p>
        </div>
    );
}

export default Error;
