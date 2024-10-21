import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Navbar() {
    const [searchText, setSearchText] = useState("");
    const [isHamburger, setIsHamburger] = useState(window.innerWidth <= 1200);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1200) {
                setIsHamburger(true);
            } else {
                setIsHamburger(false);
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
                            <Link to="/login" className="loginButton">
                                Login
                            </Link>
                            <Link to="/profile" className="profileImage" />
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
                        <Link to="/login" className="loginButton">
                            Login
                        </Link>
                        <Link to="/profile" className="profileImage" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;
