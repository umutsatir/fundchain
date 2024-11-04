import React, { useState } from "react";
import "../styles/Signup.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate, Link } from "react-router-dom";
import $ from "jquery";

function Signup() {
    const [isConfirmedFirst, setIsConfirmedFirst] = useState(false); //State to handling the confirmed situation.
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

    const handleCreateAccount = () => {
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
                if (data.success) {
                    console.log("Account created successfully");
                    navigate("/login");
                } else {
                    console.log(data);
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
        <div className="Signup-container">
            {/* redirecting to login page */}
            <div className="redirecting-loginPage">
                <span className="redirecting-text">Have an account?</span>
                <Link to="/login" className="loginPage-link">
                    Log in
                </Link>
            </div>
            <div className="divider"></div>

            <h1 className="Signup-title">Sign up</h1>
            <form>
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
            </form>

            <div className="Signup-condition">
                <button
                    className={`condition-button ${
                        isConfirmedFirst ? "confirmed" : ""
                    }`}
                    onClick={handleButtonClickFirst}
                >
                    {isConfirmedFirst && <i className="fas fa-check"></i>}{" "}
                    {/* check sign*/}
                </button>
                <span className="condition-text">
                    Send me a weekly mix of handpicked projects, plus occasional
                    Fundchain news
                </span>
            </div>

            <div className="Signup-condition">
                <button
                    className={`condition-button ${
                        isConfirmedSecond ? "confirmed" : ""
                    }`}
                    onClick={handleButtonClickSecond}
                >
                    {isConfirmedSecond && <i className="fas fa-check"></i>}{" "}
                    {/* check sign*/}
                </button>
                <span className="condition-text">
                    Contact me about participating in Fundchain research
                </span>
            </div>

            <button className="Signup-button" onClick={handleCreateAccount}>
                Create account
            </button>
        </div>
    );
}

export default Signup;
