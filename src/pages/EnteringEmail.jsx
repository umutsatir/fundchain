import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/EnteringEmail.module.css";

function EnteringEmail() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        navigate("/validation-email", { state: { isValidated: true } });
    };

    const handleBack = () => {
        navigate("/login");
    };

    return (
        <div className={styles.EnteringEmailContainer}>
            <div className={styles.upperPart}>
                <button className={styles.backButton} onClick={handleBack}>
                    &#8592;
                </button>
                <p className={styles.title}>Forgot your password?</p>
            </div>

            <p className={styles.divider}></p>
            <p className={styles.knowledge}>
                Enter the email address you used to sign up and we'll send you a
                link to reset your password.
            </p>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    required
                    onChange={handleEmail}
                />

                {error && <p className={styles.errorMessage}>{error}</p>}
                <button type="submit" className={styles.continueButton}>
                    Continue
                </button>
            </form>
        </div>
    );
}

export default EnteringEmail;
