import styles from "../styles/Error.module.css"; // Import the CSS Module
import { Link } from "react-router-dom";

function Error() {
    return (
        <div className={styles.errorContainer}>
            <div className={styles.messageContainer}>
                <h1 className={styles.error404}>404</h1>
                <h1 className={styles.errorMessage}>
                    We couldn't find this page.
                </h1>
            </div>

            <div className={styles.divider}></div>
            <p className={styles.errorSubMessage}>
                Maybe, it's out there, somewhere...
            </p>
            <div className={styles.errorRedirecting}>
                <span className={styles.redirectingText}>
                    You can always find insightful projects on our{" "}
                </span>
                <Link to="/" className={styles.redirectingLink}>
                    homepage.
                </Link>
            </div>
        </div>
    );
}

export default Error;
