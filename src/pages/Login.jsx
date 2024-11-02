import React, {useState} from "react";
import "./Login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const [isConfirmed, setIsConfirmed] = useState(false);  //State to handling the confirmed situation.
    const navigate = useNavigate();

    const handleButtonClick = () => {
        setIsConfirmed(!isConfirmed);
    };

    const handleLogin = () => {
        navigate("/Profile")
    }

    return (
        <div className="login-container">
            <h1 className="login-title">Log in</h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" required/>
                <input type="password" placeholder="Password" required/>
            </form>
            <Link to="#" className="forgot-password">Forgot your password?</Link>
            <button className="login-button" onClick={handleLogin}>Log in</button>
            {/*Remember me section*/}
            <div className="remember-me">
                <button
                    className={`remember-button ${isConfirmed ? "confirmed" : ""}`}
                    onClick={handleButtonClick}
                >
                    {isConfirmed && <i className="fas fa-check"></i>}   {/* check sign*/}
                </button>
                <span className="remember-text">Remember me</span>
            </div>
            <div className="divider"></div>
            {/* redirecting to signup page */}
            <div className="redirecting-signup">
                <span className="signup-text">New to Fundchain?</span>
                <Link to="/Signup" className="signup-link">Sign up</Link>
            </div>
        </div>
    );
}

export default Login;
