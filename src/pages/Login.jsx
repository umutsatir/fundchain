import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import $ from "jquery";
import styles from "../styles/Login.module.css"; // Import CSS module

function Login({ onLogin }) {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const cookies = new Cookies();
        if (cookies.get("loggedIn")) {
            navigate("/profile");
        }
    }, []);

    useEffect(() => {
        console.log(error);
    }, [error]);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        // Send AJAX request if inputs are valid
        $.ajax({
            url: "http://localhost:8000/login.php",
            type: "POST",
            data: {
                email: email,
                password: password,
                isRemembered: isConfirmed,
            },
            success: function (data) {
                console.log(data);
                data = JSON.parse(data);
                if (data.status) {
                    onLogin(data.token, data.username);
                    navigate("/");
                } else {
                    setError(data.message);
                }
            },
            error: function (error) {
                console.log(error);
            },
        });
    };

    const handleButtonClick = () => {
        setIsConfirmed(!isConfirmed);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className={styles.loginContainer}>
            <h1 className={styles.loginTitle}>Log in</h1>
            <form onSubmit={handleSubmit}>
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
                <Link to="#" className={styles.forgotPassword}>
                    Forgot your password?
                </Link>
                <button type="submit" className={styles.loginButton}>
                    Log in
                </button>
            </form>
            {/* Remember me section */}
            <div className={styles.rememberMe}>
                <button
                    type="button"
                    className={`${styles.rememberButton} ${
                        isConfirmed ? styles.confirmed : ""
                    }`}
                    onClick={handleButtonClick}
                >
                    {isConfirmed && <i className="fas fa-check"></i>}
                </button>
                <span className={styles.rememberText}>Remember me</span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.redirectingSignup}>
                <span className={styles.signupText}>New to Fundchain?</span>
                <Link to="/signup" className={styles.signupLink}>
                    Sign up
                </Link>
            </div>
            {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
    );
}

export default Login;
