import React from "react";
import styles from "../styles/Error.module.css"; // Import the CSS Module

function Error() {

    return (
            <div className={styles.errorContainer}>
                <h1 className={errorMessage}>ERROR</h1>
                <h1 className={error404}>404</h1>
                <h1 className={errorMessage}>Page Not Found</h1>
                <p className={errorSubMessage}>Sorry, the page you were looking for does not exist.</p>

                <div className={redirectingSignup}>
                    <span className={signupText}>New to Fundchain?</span>
                    <Link to="/signup" className={SignupLink}>
                        Sign up
                    </Link>
                </div>
            </div>
    );
}

export default Error;
