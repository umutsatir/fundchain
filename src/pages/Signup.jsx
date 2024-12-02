import React, { useState } from "react";
import styles from "../styles/Signup.module.css"; // Import CSS Module
import { useNavigate, Link } from "react-router-dom";
import $ from "jquery";

function Signup() {
    const [isConfirmedFirst, setIsConfirmedFirst] = useState(false);
    const [isConfirmedSecond, setIsConfirmedSecond] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleButtonClickFirst = () => {
        setIsConfirmedFirst(!isConfirmedFirst);
    };
    const handleButtonClickSecond = () => {
        setIsConfirmedSecond(!isConfirmedSecond);
    };

    const handleCreateAccount = (e) => {
        e.preventDefault();
        $.ajax({
            url: "http://localhost:8000/signup.php",
            type: "POST",
            data: {
                username: username,
                email: email,
                password: password,
            },
            success: function (data) {
                data = JSON.parse(data);
                if (data.status) {
                    navigate("/login");
                } else {
                    console.log(data.message);
                }
            },
            error: function (error) {
                console.log(error);
            },
        });
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
