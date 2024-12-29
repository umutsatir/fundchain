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

    const [errors, setErrors] = useState({
            username: "",
            email: "",
            password: "",
        });
    

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

        let valid = true;
        const newErrors = { email: "", password: ""};

        if (!email) {
            newErrors.email = "Email is required.";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email address.";
            valid = false;
        }

        if (!password) {
            newErrors.password = "Password is required.";
            valid = false;
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
            valid = false;
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = "Password must contain at least one uppercase letter.";
            valid = false;
        } else if (!/[a-z]/.test(password)) {
            newErrors.password = "Password must contain at least one lowercase letter.";
            valid = false;
        } else if (!/[0-9]/.test(password)) {
            newErrors.password = "Password must contain at least one number.";
            valid = false;
        }
        // else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        //     newErrors.password = "Password must contain at least one special character.";
        //     valid = false;
        // }

        setErrors(newErrors);

        if(valid) {
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
        }
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
                {errors.email && (<span className={styles.errorMessage}>{errors.email}</span>)}
                <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={handlePassword}
                />
                {errors.password && (<span className={styles.errorMessage}>{errors.password}</span>)}
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
