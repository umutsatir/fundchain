import React from "react";
import "./Footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
    return (
        <footer className="footer_container">
            <div className="footer-block">
                <div className="logo">Logo</div>
                <div className="social-icons">
                    <a href="#">
                        <i className="fa-brands fa-x"></i>
                    </a>
                    <a href="#">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#">
                        <i className="fa-brands fa-youtube"></i>
                    </a>
                    <a href="#">
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                </div>
            </div>

            <div className="footer-block">
                <h4>ABOUT</h4>
                <a href="#">About Us</a>
                <a href="#">Stats</a>
            </div>

            <div className="footer-block">
                <h4>SUPPORT</h4>
                <a href="#">Our Rules</a>
                <a href="#">Creator Resources</a>
            </div>

            <div className="footer-block">
                <h4>MORE</h4>
                <a href="#">Contact Us</a>
                <a href="#">Newsletters</a>
            </div>
        </footer>
    );
};

export default Footer;
