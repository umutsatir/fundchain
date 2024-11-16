import "../styles/Settings.css";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import SettingsTab from "../components/SettingsTab/SettingsTab";

function Settings() {
    return (
        <div className="body">
            <h1 className="settings-title">Settings</h1>
            <div className="settings-wrapper">
                <SettingsTab />
            </div>
        </div>
    );
}

export default Settings;
