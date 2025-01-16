import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/ValidationEmail.module.css";
import $ from "jquery";
import { apiUrl } from "../api_url";

function ValidationEmail({ handleNotification }) {
    const navigate = useNavigate();
    const location = useLocation();
    if (!location.state || !location.state.isValidated) {
        navigate("/forgot-password");
        return;
    }

    const [number, setNumber] = useState("");
    const [error, setError] = useState("");
    const [countdown, setCountdown] = useState(120); // 2 minutes = 120 seconds
    const [code, setCode] = useState(generateAuthCode());

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        if (number.length != 6) {
            setError("Please enter a valid 6-digit number.");
        } else {
            if (number == code) {
                navigate("/reset-password", {
                    state: { isValidated: true, email: location.state.email },
                });
            }
        }
    };

    function generateAuthCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // useEffect for counter
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000); // reduce every second.
            return () => clearTimeout(timer);
        }

        setCode(generateAuthCode());
    }, [countdown]);

    const handleBack = () => {
        navigate("/forgot-password");
    };

    useEffect(() => {
        $.ajax({
            url: apiUrl + "/send_code.php",
            type: "POST",
            data: {
                email: location.state.email,
                code: code,
            },
            success: function (result) {
                handleNotification("Code sent to the email", "success");
            },
            error: function (error) {
                console.log(error);
                handleNotification("An error occurred", "error");
            },
        });
    }, []);

    return (
        <div className={styles.ValidationEmailContainer}>
            <div className={styles.upperPart}>
                <button className={styles.backButton} onClick={handleBack}>
                    &#8592;
                </button>
                <p className={styles.title}>Forgot your password?</p>
            </div>

            <p className={styles.divider}></p>
            <p className={styles.knowledge}>
                Please enter the 6 digit password we have sent to you.
            </p>

            {/* Displaying Counter */}
            <p className={countdown > 0 ? styles.timer : styles.timerExpired}>
                {countdown > 0 ? (
                    <>{countdown}</>
                ) : (
                    "Time's up! Please request a new code."
                )}
            </p>

            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Enter 6-digit number"
                    onChange={(e) => setNumber(e.target.value)}
                    maxLength={6}
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
