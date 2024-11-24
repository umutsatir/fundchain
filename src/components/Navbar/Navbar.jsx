import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import styles from "./Navbar.module.css"; // Importing CSS Module

function Navbar({ onLogout, loggedIn }) {
    const [searchText, setSearchText] = useState("");
    const [isHamburger, setIsHamburger] = useState(window.innerWidth <= 1200);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);

    function getCookie(name) {
        const cookies = new Cookies();
        return cookies.get(name);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1200) {
                setIsHamburger(true);
            } else {
                setIsHamburger(false);
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        setIsLoggedIn(loggedIn);
    }, [loggedIn]);

    const handleStartProject = () => {
        if (isLoggedIn == true) {
            window.location.href = "/create";
        } else {
            window.location.href = "/login";
        }
    };

    const deleteClick = () => {
        setSearchText("");
    };

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (searchText.trim() === "") return;
            window.location.href = "/search?q=" + searchText;
        }
    };

    return (
        <div>
            <nav className={styles.navbar}>
                <Link to="/" className={styles.fundchainText}>
                    Fundchain
                </Link>
                {!isHamburger && (
                    <>
                        <div className={styles.searchContainer}>
                            <input
                                className={styles.searchInput}
                                type="text"
                                placeholder="Search..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <div className={styles.deleteIcon}>
                                <a
                                    onClick={deleteClick}
                                    className={styles.xmark}
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </a>
                            </div>
                        </div>
                        <div className={styles.navbarButtons}>
                            {isLoggedIn == true ? (
                                <>
                                    <Link
                                        className={styles.startProjectButton}
                                        onClick={onLogout}
                                    >
                                        Logout
                                    </Link>
                                    <Link
                                        className={styles.startProjectButton}
                                        onClick={handleStartProject}
                                    >
                                        Start a Project
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className={styles.profileImage}
                                    />
                                </>
                            ) : (
                                <>
                                    <Link
                                        className={styles.startProjectButton}
                                        onClick={handleStartProject}
                                    >
                                        Start a Project
                                    </Link>
                                    <Link
                                        to="/login"
                                        className={styles.loginButton}
                                    >
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
                    </>
                )}
                {isHamburger && (
                    <div className={styles.hamburger}>
                        <a onClick={handleMenuClick}>
                            <i className="fa fa-bars"></i>
                        </a>
                    </div>
                )}
            </nav>
            {isMenuOpen && (
                <div className={styles.menu}>
                    <div className={styles.searchContainer}>
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder="Search..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <div className={styles.deleteIcon}>
                            <a onClick={deleteClick} className={styles.xmark}>
                                <i className="fa-solid fa-xmark"></i>
                            </a>
                        </div>
                    </div>
                    <div className={styles.navbarButtons}>
                        <Link
                            className={styles.startProjectButton}
                            onClick={onLogout}
                        >
                            Logout
                        </Link>
                        <Link
                            to="/create"
                            className={styles.startProjectButton}
                        >
                            Start a Project
                        </Link>
                        {getCookie("loggedIn") == true ? (
                            <Link
                                to="/profile"
                                className={styles.profileImage}
                            />
                        ) : (
                            <Link to="/login" className={styles.loginButton}>
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;
