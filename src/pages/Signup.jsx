import React, {useState} from "react";
import "./Signup.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate, Link } from "react-router-dom";


function Signup() {

    const [isConfirmedFirst, setIsConfirmedFirst] = useState(false);  //State to handling the confirmed situation.
    const [isConfirmedSecond, setIsConfirmedSecond] = useState(false)
    const navigate = useNavigate();

    const handleButtonClickFirst = () => {
        setIsConfirmedFirst(!isConfirmedFirst);
    };
    const handleButtonClickSecond = () => {
        setIsConfirmedSecond(!isConfirmedSecond);
    };

    const handleCreateAccount = () => {
        navigate("/Profile")
    }

    return (
        <div className="Signup-container">

            {/* redirecting to login page */}
            <div className="redirecting-loginPage">
                <span className="redirecting-text">Have an account?</span>
                <Link to="/Login" className="loginPage-link">Log in</Link>
            </div>
            <div className="divider"></div>

            <h1 className="Signup-title">Sign up</h1>
            <form onSubmit={handleCreateAccount}>
                <input type="text" placeholder="Name" required/>
                <input type="email" placeholder="Email" required/>
                <input type="password" placeholder="Password" required/>
            </form>
            
            <div className="Signup-condition">
                <button
                    className={`condition-button ${isConfirmedFirst ? "confirmed" : ""}`}
                    onClick={handleButtonClickFirst}
                >
                    {isConfirmedFirst && <i className="fas fa-check"></i>}   {/* check sign*/}
                </button>
                <span className="condition-text">Send me a weekly mix of handpicked projects, plus occasional Fundchain news</span>
            </div>

            <div className="Signup-condition">
                <button
                    className={`condition-button ${isConfirmedSecond ? "confirmed" : ""}`}
                    onClick={handleButtonClickSecond}
                >
                    {isConfirmedSecond && <i className="fas fa-check"></i>}   {/* check sign*/}
                </button>
                <span className="condition-text">Contact me about participating in Fundchain research</span>
            </div>

            <button className="Signup-button" onClick={handleCreateAccount}>Create account</button>
        </div>
    );
}

export default Signup;
