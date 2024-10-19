import React, { useState } from "react";

import "../Navbar/Navbar.css";

import profilePic from "../assets/profilePicture.png";
import deleteIcon from "../assets/deleteIcon.png";

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
                    <input className="searchInput" 
                            type="text" 
                            placeholder="Search..." 
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}/>
                    <div className="deleteIcon">
                        <img src={deleteIcon} onClick={deleteClick}></img>
                    </div>
                </div>
                <div className="navbarButtons">
                    <button className="startProjectButton">Start a Project</button>
                    <button className="loginButton">Login</button>
                    <img className="profileImage" src={profilePic} alt="Profile"/>
                </div>
            </nav>
        </div>  
      );
}

export default Navbar;