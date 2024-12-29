import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/ValidationEmail.module.css";

function ValidationEmail() {
    const [number, setNumber] = useState("");
    const [error, setError] = useState("");
    const [countdown, setCountdown] = useState(120); // 2 minutes = 120 seconds
    const navigate = useNavigate();

    const handleNumber = (e) => {
        const value = e.target.value;

        if (/^\d*$/.test(value)) { //Permit Only number
            setNumber(value);
            setError("");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        if (number.length !== 6) {
            setError("Please enter a valid 6-digit number.");
        } else {
            navigate("/forgot-password");
        }
    };

     // useEffect for counter
     useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000); // reduce every second.
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleBack = () => {
        navigate("/enter-email");
    };

    return (
        <div className={styles.ValidationEmailContainer}>
            <div className={styles.upperPart}>
                <button className={styles.backButton} onClick={handleBack}>
                    &#8592;
                </button>
                <p className={styles.title}>Forgot your password?</p>
            </div>

            <p className={styles.divider}></p>
            <p className={styles.knowledge}>Please enter the 6 digit password we have sent to you.</p>
            
            {/* Displaying Counter */}
            <p className={countdown > 0 ? styles.timer : styles.timerExpired}>
                {countdown > 0 ? (
                        <>
                            {countdown}
                        </>
                    ) :
                    "Time's up! Please request a new code."}
            </p>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter 6-digit number"
                    onChange={handleNumber}
                    maxLength="6"
                    required
                    disabled={countdown === 0}
                />

                {error && <p className={styles.errorMessage}>{error}</p>}
                <button
                    type="submit"
                    className={styles.continueButton}
                    disabled={countdown === 0}
                >
                    Continue
                </button>
            </form>
        </div>
    );
}

export default ValidationEmail;
