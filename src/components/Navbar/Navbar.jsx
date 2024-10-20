import React, { useState } from "react";

import "./Navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Navbar() {
    const [searchText, setSearchText] = useState("");

    const deleteClick = () => {
        setSearchText("");
    };

    return (
        <div>
            <nav className="navbar">
                <h1 className="fundchainText">Fundchain</h1>
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
                    <button className="startProjectButton">
                        Start a Project
                    </button>
                    <button className="loginButton">Login</button>
                    <img
                        className="profileImage"
                        src="/profilePicture.png"
                        alt="Profile"
                    />
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
