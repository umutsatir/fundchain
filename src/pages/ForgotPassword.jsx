import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/ForgotPassword.module.css";
import $ from "jquery";
import { apiUrl } from "../api_url";

function ForgotPassword({ handleNotification }) {
    const navigate = useNavigate();
    const location = useLocation();
    if (!location.state || !location.state.isValidated) {
        navigate("/forgot-password");
        return;
    }

    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [error, setError] = useState("");

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordAgain = (e) => {
        setPasswordAgain(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        if (password !== passwordAgain) {
            setError("Both passwords must be the same.");
        } else {
            $.ajax({
                url: apiUrl + "/resetPassword.php",
                type: "POST",
                data: {
                    email: location.state.email,
                    password: password,
                },
                success: function (result) {
                    result = JSON.parse(result);
                    if (result.status) {
                        handleNotification(
                            "Password reset successfully",
                            "success"
                        );
                        navigate("/login");
                    } else {
                        handleNotification(result.message, "error");
                    }
                },
                error: function (error) {
                    console.log(error);
                    handleNotification("An error occurred", "error");
                },
            });
        }
    };

    const handleBack = () => {
        navigate("/enter-email");
    };

    return (
        <div className={styles.ForgotPasswordContainer}>
            <div className={styles.upperPart}>
                <button className={styles.backButton} onClick={handleBack}>
                    &#8592;
                </button>
                <p className={styles.title}>Forgot your password?</p>
            </div>

            <p className={styles.divider}></p>
            <p className={styles.knowledge}>
                Create a new password for your account.
            </p>

            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New password"
                    required
                    onChange={handlePassword}
                />

                <input
                    type="password"
                    placeholder="New password again"
                    required
                    onChange={handlePasswordAgain}
                />

                {error && <p className={styles.errorMessage}>{error}</p>}
                <button type="submit" className={styles.finishButton}>
                    Finish
                </button>
            </form>
        </div>
    );
}

export default ForgotPassword;
