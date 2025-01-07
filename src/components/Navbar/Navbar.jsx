import React, { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css"; // Importing CSS Module
import { Cookies } from "react-cookie";
import $ from "jquery";
import { apiUrl } from "../../api_url";

function Navbar({ onLogout, loggedIn }) {
    const [searchText, setSearchText] = useState("");
    const [isHamburger, setIsHamburger] = useState(window.innerWidth <= 1200);
    const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [profilePic, setProfilePic] = useState(
        "https://i.imgur.com/cBselON.png"
    );
    const navigate = useNavigate();
    const cookies = new Cookies();

    // Handle window resize for hamburger menu
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1200) {
                setIsHamburger(true);
            } else {
                setIsHamburger(false);
                setIsProfileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Sync state with the loggedIn prop
    useEffect(() => {
        setIsLoggedIn(loggedIn);

        $.ajax({
            url: apiUrl + "/getProfilePic.php",
            type: "POST",
            data: {
                username: cookies.get("username"),
            },
            success: function (result) {
                result = JSON.parse(result);
                if (result.status) {
                    setProfilePic(result.data);
                }
            },
            error: function (error) {
                console.log(error);
            },
        });
    }, [loggedIn]);

    const handleStartProject = () => {
        setIsProfileMenuOpen(false);
        if (isLoggedIn) {
            navigate("/create");
        } else {
            navigate("/login");
        }
    };

    const handleProfileClick = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const handleNavigate = (path) => {
        navigate(path);
        setIsProfileMenuOpen(false);
    };

    const deleteClick = () => {
        setSearchText("");
    };

    const handleMenuClick = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (searchText.trim() !== "") {
                navigate(`/search?q=${searchText}`);
            }
        }
    };

    return (
        <div>
            <nav className={styles.navbar}>
                <Link to="/" className={styles.fundchainText}>
                    Fundchain
                </Link>
                {!isHamburger ? (
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
                            {isLoggedIn ? (
                                <>
                                    <ConnectButton chainStatus={"none"} />
                                    <div
                                        className={styles.profileImage}
                                        style={{
                                            backgroundImage: `url(${profilePic})`,
                                        }}
                                        onClick={handleProfileClick}
                                    />
                                    {isProfileMenuOpen && (
                                        <>
                                            <div
                                                className={styles.dropdownCard}
                                            >
                                                <ul>
                                                    <li
                                                        onClick={() =>
                                                            handleStartProject()
                                                        }
                                                    >
                                                        Create a Project
                                                    </li>
                                                    <li
                                                        onClick={() =>
                                                            handleNavigate(
                                                                "/profile"
                                                            )
                                                        }
                                                    >
                                                        Profile Page
                                                    </li>
                                                    <li
                                                        onClick={() =>
                                                            handleNavigate(
                                                                "/settings"
                                                            )
                                                        }
                                                    >
                                                        Settings
                                                    </li>
                                                    <li
                                                        onClick={() =>
                                                            handleNavigate(
                                                                "/saved-projects"
                                                            )
                                                        }
                                                    >
                                                        Saved Projects
                                                    </li>
                                                    <li
                                                        onClick={() =>
                                                            handleNavigate(
                                                                "/projects"
                                                            )
                                                        }
                                                    >
                                                        My Projects
                                                    </li>
                                                    <li
                                                        onClick={() =>
                                                            onLogout()
                                                        }
                                                    >
                                                        Logout
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <button
                                        className={styles.startProjectButton}
                                        onClick={handleStartProject}
                                    >
                                        Start a Project
                                    </button>
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
                ) : (
                    <>
                        <div className={styles.hamburger}>
                            {loggedIn ? (
                                <ConnectButton
                                    accountStatus={"avatar"}
                                    chainStatus={"none"}
                                />
                            ) : (
                                <></>
                            )}
                            <a onClick={handleMenuClick}>
                                <i className="fa fa-bars"></i>
                            </a>
                        </div>
                        {isProfileMenuOpen && (
                            <div className={styles.dropdownCard}>
                                {isLoggedIn ? (
                                    <>
                                        <ul>
                                            <li
                                                onClick={() =>
                                                    handleNavigate("/create")
                                                }
                                            >
                                                Create a Project
                                            </li>
                                            <li
                                                onClick={() =>
                                                    handleNavigate("/profile")
                                                }
                                            >
                                                Profile Page
                                            </li>
                                            <li
                                                onClick={() =>
                                                    handleNavigate("/settings")
                                                }
                                            >
                                                Settings
                                            </li>
                                            <li
                                                onClick={() =>
                                                    handleNavigate(
                                                        "/saved-projects"
                                                    )
                                                }
                                            >
                                                Saved Projects
                                            </li>
                                            <li
                                                onClick={() =>
                                                    handleNavigate("/projects")
                                                }
                                            >
                                                My Projects
                                            </li>
                                            <li
                                                onClick={() => {
                                                    onLogout();
                                                    setIsProfileMenuOpen(false);
                                                }}
                                            >
                                                Logout
                                            </li>
                                        </ul>
                                    </>
                                ) : (
                                    <>
                                        <ul>
                                            <li
                                                onClick={() =>
                                                    handleNavigate("/login")
                                                }
                                            >
                                                Login
                                            </li>
                                        </ul>
                                    </>
                                )}
                            </div>
                        )}
                    </>
                )}
            </nav>
        </div>
    );
}

export default Navbar;
