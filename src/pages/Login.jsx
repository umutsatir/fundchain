import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate, Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import $ from "jquery";

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
                data = JSON.parse(data);
                if (data.status) {
                    onLogin(data.token);
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
        <div className="login-container">
            <h1 className="login-title">Log in</h1>
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
                <Link to="#" className="forgot-password">
                    Forgot your password?
                </Link>
                <button type="submit" className="login-button">
                    Log in
                </button>
            </form>
            {/* Remember me section */}
            <div className="remember-me">
                <button
                    type="button"
                    className={`remember-button ${
                        isConfirmed ? "confirmed" : ""
                    }`}
                    onClick={handleButtonClick}
                >
                    {isConfirmed && <i className="fas fa-check"></i>}
                </button>
                <span className="remember-text">Remember me</span>
            </div>
            <div className="divider"></div>
            <div className="redirecting-signup">
                <span className="signup-text">New to Fundchain?</span>
                <Link to="/signup" className="signup-link">
                    Sign up
                </Link>
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default Login;
