import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Cookies } from "react-cookie";

function Navbar({ onLogout }) {
    const [searchText, setSearchText] = useState("");
    const [isHamburger, setIsHamburger] = useState(window.innerWidth <= 1200);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <nav className="navbar">
                <Link to="/" className="fundchainText">
                    Fundchain
                </Link>
                {!isHamburger && (
                    <>
                        <div className="searchContainer">
                            <input
                                className="searchInput"
                                type="text"
                                placeholder="Search..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <div className="deleteIcon">
                                <a onClick={deleteClick} className="xmark">
                                    <i className="fa-solid fa-xmark"></i>
                                </a>
                            </div>
                        </div>
                        <div className="navbarButtons">
                            {getCookie("loggedIn") == true ? (
                                <>
                                    <Link
                                        className="startProjectButton"
                                        onClick={onLogout}
                                    >
                                        Logout
                                    </Link>
                                    <Link
                                        to="/create"
                                        className="startProjectButton"
                                    >
                                        Start a Project
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="profileImage"
                                    />
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/create"
                                        className="startProjectButton"
                                    >
                                        Start a Project
                                    </Link>
                                    <Link to="/login" className="loginButton">
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
                    </>
                )}
                {isHamburger && (
                    <div className="hamburger">
                        <a onClick={handleMenuClick}>
                            <i className="fa fa-bars"></i>
                        </a>
                    </div>
                )}
            </nav>
            {isMenuOpen && (
                <div className="menu">
                    <div className="searchContainer">
                        <input
                            className="searchInput"
                            type="text"
                            placeholder="Search..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="deleteIcon">
                            <a onClick={deleteClick} className="xmark">
                                <i className="fa-solid fa-xmark"></i>
                            </a>
                        </div>
                    </div>
                    <div className="navbarButtons">
                        <Link to="/create" className="startProjectButton">
                            Start a Project
                        </Link>
                        {getCookie("loggedIn") == true ? (
                            <Link to="/profile" className="profileImage" />
                        ) : (
                            <Link to="/login" className="loginButton">
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
