import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./SettingsTab.module.css";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

const SettingsTab = () => {
    const [activeTab, setActiveTab] = useState("account");
    const [activePasswordChange, setActivePasswordChange] = useState(false);
    const navigate = useNavigate();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handlePasswordChange = () => {
        setActivePasswordChange(!activePasswordChange);
    };

    function handleEditProfileSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        $.ajax({
            url: "http://localhost:8000/editProfile.php",
            type: "POST",
            data: { data: JSON.stringify(data) },
            success: function (result) {
                console.log(result);
                result = JSON.parse(result);
                if (result.status) {
                    // todo send popup message to user
                    console.log("Profile updated");
                } else {
                    console.log(result.message);
                }
            },
            error: function (error) {
                console.log("error: ", error);
                navigate("/error");
            },
        });
    }

    return (
        <div className={styles.settingsContainer}>
            <div className={styles.tabs}>
                <button
                    className={`${
                        activeTab === "account" ? styles.activeTab : ""
                    }`}
                    onClick={() => handleTabClick("account")}
                >
                    Account
                </button>
                <button
                    className={`${
                        activeTab === "editProfile" ? styles.activeTab : ""
                    }`}
                    onClick={() => handleTabClick("editProfile")}
                >
                    Edit Profile
                </button>
                <button
                    className={`${
                        activeTab === "notifications" ? styles.activeTab : ""
                    }`}
                    onClick={() => handleTabClick("notifications")}
                >
                    Notifications
                </button>
                <button
                    className={`${
                        activeTab === "paymentMethods" ? styles.activeTab : ""
                    }`}
                    onClick={() => handleTabClick("paymentMethods")}
                >
                    Wallet Connection
                </button>
                <button
                    className={`${
                        activeTab === "shippingAddress" ? styles.activeTab : ""
                    }`}
                    onClick={() => handleTabClick("shippingAddress")}
                >
                    Shipping Address
                </button>
                <button
                    className={`${
                        activeTab === "following" ? styles.activeTab : ""
                    }`}
                    onClick={() => handleTabClick("following")}
                >
                    Following
                </button>
            </div>
            <div className={styles.content}>
                {activeTab === "account" && (
                    <Account
                        handlePasswordChange={handlePasswordChange}
                        activePasswordChange={activePasswordChange}
                    />
                )}
                {activeTab === "editProfile" && (
                    <EditProfile handleSubmit={handleEditProfileSubmit} />
                )}
                {activeTab === "notifications" && <Notifications />}
                {activeTab === "paymentMethods" && <PaymentMethods />}
                {activeTab === "shippingAddress" && <ShippingAddress />}
                {activeTab === "following" && <Following />}
            </div>
        </div>
    );
};

const Account = ({ handlePasswordChange, activePasswordChange }) => (
    <div className={styles.accountTab}>
        <form>
            <div>
                <h3>Email</h3>
                <input className={styles.emailBox} type="text" />
            </div>
            <div>
                <h3>Password</h3>
                <button
                    className={`${styles.changePasswordButton} ${
                        activePasswordChange ? styles.hoverActive : ""
                    }`}
                    type="button"
                    onClick={handlePasswordChange}
                >
                    Change Password
                </button>
            </div>
            {activePasswordChange && (
                <div className={styles.passwordChangeFields}>
                    <div>
                        <h3>New Password</h3>
                        <input className={styles.passwordBox} type="password" />
                        <label>Minimum 6 characters!</label>
                    </div>
                    <div>
                        <h3>Confirm New Password</h3>
                        <input className={styles.passwordBox} type="password" />
                        <label>Enter same password</label>
                    </div>
                </div>
            )}
            <div className={styles.saveChangesContainer}>
                <h3>Current Password</h3>
                <input className={styles.passwordBox} type="password" />
                <button className={styles.saveButton} type="submit">
                    Save Changes
                </button>
            </div>
        </form>
    </div>
);

const EditProfile = ({ handleSubmit }) => (
    <div className={styles.editProfileTab}>
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <h3>Name</h3>
                    <input className={styles.nameBox} name="name" type="text" />
                </div>
                <div>
                    <h3>Avatar</h3>
                    <input
                        className={styles.avatarBox}
                        name="avatar"
                        type="file"
                    />
                </div>
                <div>
                    <h3>Location</h3>
                    <input
                        className={styles.locationBox}
                        name="location"
                        type="text"
                    />
                </div>
                <div>
                    <h3>Time Zone</h3>
                    <select className={styles.timezoneBox} name="timezone">
                        <option value="gmt">GMT</option>
                        <option value="gmt1">GMT+1</option>
                        <option value="gmt2">GMT+2</option>
                    </select>
                </div>
                <button className={styles.saveButton} type="submit">
                    Save Changes
                </button>
            </div>

            <div>
                <h3>Biography</h3>
                <textarea className={styles.biographyBox} name="biography" />
            </div>
        </form>
    </div>
);

const Notifications = () => <div>Notification Settings</div>;
const PaymentMethods = () => (
    <div className={styles.paymentTab}>
        <ConnectButton />
    </div>
);
const ShippingAddress = () => <div>Shipping Address</div>;
const Following = () => <div>Following Settings</div>;

export default SettingsTab;
