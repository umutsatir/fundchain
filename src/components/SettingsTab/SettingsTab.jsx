import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./SettingsTab.module.css";

const SettingsTab = () => {
    const [activeTab, setActiveTab] = useState("account");
    const [activePasswordChange, setActivePasswordChange] = useState(false);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handlePasswordChange = () => {
        setActivePasswordChange(!activePasswordChange);
    };

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
                {activeTab === "editProfile" && <EditProfile />}
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

const EditProfile = () => (
    <div className={styles.editProfileTab}>
        <form>
            <div>
                <div>
                    <h3>Name</h3>
                    <input className={styles.nameBox} type="text" />
                </div>
                <div>
                    <h3>Avatar</h3>
                    <input className={styles.avatarBox} type="file" />
                </div>
                <div>
                    <h3>Location</h3>
                    <input className={styles.locationBox} type="text" />
                </div>
                <div>
                    <h3>Time Zone</h3>
                    <select className={styles.timezoneBox}>
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
                <textarea className={styles.biographyBox} />
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
