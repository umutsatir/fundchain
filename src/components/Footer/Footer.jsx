import React from "react";
import styles from "./Footer.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.footerBlock}>
                <div className={styles.logo}>Logo</div>
                <div className={styles.socialIcons}>
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

            <div className={styles.footerBlock}>
                <h4>ABOUT</h4>
                <a href="#">About Us</a>
                <a href="#">Stats</a>
            </div>

            <div className={styles.footerBlock}>
                <h4>SUPPORT</h4>
                <a href="#">Our Rules</a>
                <a href="#">Creator Resources</a>
            </div>

            <div className={styles.footerBlock}>
                <h4>MORE</h4>
                <a href="#">Contact Us</a>
                <a href="#">Newsletters</a>
            </div>
        </footer>
    );
};

export default Footer;
