import React, { useState } from "react";
import styles from "../styles/Signup.module.css"; // Import CSS Module
import { useNavigate, Link } from "react-router-dom";
import { apiUrl } from "../api_url";
import $ from "jquery";

function Signup({ handleNotification }) {
    const [isConfirmedFirst, setIsConfirmedFirst] = useState(false);
    const [isConfirmedSecond, setIsConfirmedSecond] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleButtonClickFirst = () => {
        setIsConfirmedFirst(!isConfirmedFirst);
    };

    const handleButtonClickSecond = () => {
        setIsConfirmedSecond(!isConfirmedSecond);
    };

    const handleCreateAccount = (e) => {
        e.preventDefault();

        let valid = true;
        const newErrors = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        };

        if (!username) {
            newErrors.username = "* Username is required.";
            valid = false;
        } else if (username.trim().length < 5 || username.trim().length > 20) {
            newErrors.username =
                "* Username must be between 5 and 20 characters.";
            valid = false;
        } else if (/[^a-zA-Z0-9]/.test(username)) {
            newErrors.username =
                "* Username can only contain letters and numbers.";
            valid = false;
        }

        if (!email) {
            newErrors.email = "* Email is required.";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "* Please enter a valid email address.";
            valid = false;
        }

        if (!password) {
            newErrors.password = "* Password is required.";
            valid = false;
        } else if (password.length < 8) {
            newErrors.password = "* Password must be at least 8 characters.";
            valid = false;
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password =
                "* Password must contain at least one uppercase letter.";
            valid = false;
        } else if (!/[a-z]/.test(password)) {
            newErrors.password =
                "* Password must contain at least one lowercase letter.";
            valid = false;
        } else if (!/[0-9]/.test(password)) {
            newErrors.password = "* Password must contain at least one number.";
            valid = false;
        }
        // else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        //     newErrors.password = "Password must contain at least one special character.";
        //     valid = false;
        // }

        if (!confirmPassword) {
            newErrors.confirmPassword = "* Confirm password is required.";
            valid = false;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "* Passwords do not match.";
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            $.ajax({
                url: apiUrl + "/signup.php",
                type: "POST",
                data: {
                    username: username,
                    email: email,
                    password: password,
                },
                success: function (data) {
                    data = JSON.parse(data);
                    if (data.status) {
                        handleNotification(data.message, "success");
                        navigate("/login");
                    } else {
                        handleNotification(data.message, "error");
                    }
                },
                error: function (error) {
                    handleNotification(
                        "Signup failed due to an error",
                        "error"
                    );
                },
            });
        }
    };

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    return (
        <div className={styles.signupContainer}>
            <div className={styles.redirectingLoginPage}>
                <span className={styles.redirectingText}>Have an account?</span>
                <Link to="/login" className={styles.loginPageLink}>
                    Log in
                </Link>
            </div>
            <div className={styles.divider}></div>

            <h1 className={styles.signupTitle}>Sign up</h1>
            <form onSubmit={handleCreateAccount}>
                <input
                    type="text"
                    placeholder="Username"
                    required
                    onChange={handleUsername}
                />

                <input
                    type="email"
                    placeholder="Email"
                    required
                    onChange={handleEmail}
                />

                <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={handlePassword}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    onChange={handleConfirmPassword}
                />

                <div className={styles.errors}>
                    {errors.username && (
                        <p className={styles.errorMessage}>{errors.username}</p>
                    )}
                    {errors.email && (
                        <p className={styles.errorMessage}>{errors.email}</p>
                    )}
                    {errors.password && (
                        <p className={styles.errorMessage}>{errors.password}</p>
                    )}
                    {errors.confirmPassword && (
                        <p className={styles.errorMessage}>
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                <div className={styles.signupCondition}>
                    <button
                        className={`${styles.conditionButton} ${
                            isConfirmedFirst ? styles.confirmed : ""
                        }`}
                        onClick={handleButtonClickFirst}
                    >
                        {isConfirmedFirst && <i className="fas fa-check"></i>}
                    </button>
                    <span className={styles.conditionText}>
                        Send me a weekly mix of handpicked projects, plus
                        occasional Fundchain news
                    </span>
                </div>

                <div className={styles.signupCondition}>
                    <button
                        className={`${styles.conditionButton} ${
                            isConfirmedSecond ? styles.confirmed : ""
                        }`}
                        onClick={handleButtonClickSecond}
                    >
                        {isConfirmedSecond && <i className="fas fa-check"></i>}
                    </button>
                    <span className={styles.conditionText}>
                        Contact me about participating in Fundchain research
                    </span>
                </div>

                <button className={styles.signupButton}>Create account</button>
            </form>
        </div>
    );
}

export default Signup;
