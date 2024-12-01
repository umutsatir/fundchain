import React from "react";
import styles from "../styles/Error.module.css"; // Import the CSS Module

function Error() {

    return (
            <div className={styles.errorContainer}>
                <h1 className={styles.errorMessage}>ERROR</h1>
                <h1 className={styles.error404}>404</h1>
                <h1 className={styles.errorMessage}>Page Not Found</h1>
                <p className={styles.errorSubMessage}>Sorry, the page you were looking for does not exist.</p>

                <div className={styles.redirectingLoginPage}>
                    <span className={styles.redirectingText}>Have an account?</span>
                    <Link to="/login" className={styles.loginPageLink}>
                        Log in
                    </Link>
                </div>
            </div>
    );
}

export default Error;
