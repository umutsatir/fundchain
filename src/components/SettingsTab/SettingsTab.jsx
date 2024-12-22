import React, { useState } from "react";
import styles from "./SettingsTab.module.css";
import $, { isEmptyObject } from "jquery";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const SettingsTab = () => {
    const [activeTab, setActiveTab] = useState("account");
    const [activePasswordChange, setActivePasswordChange] = useState(false);
    const navigate = useNavigate();
    const cookies = new Cookies();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handlePasswordChange = () => {
        setActivePasswordChange(!activePasswordChange);
    };

    function handleEditProfileSubmit(e) {
        e.preventDefault();
        if (
            e.target.avatar.files.length === 0 &&
            isEmptyObject(e.target.biography.value) &&
            isEmptyObject(e.target.location.value) &&
            isEmptyObject(e.target.name.value) &&
            isEmptyObject(e.target.surname.value)
        )
            return;

        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        $.ajax({
            url: "http://localhost:8000/editProfile.php",
            type: "POST",
            data: {
                data: JSON.stringify(data),
                username: cookies.get("username"),
            },
            success: function (result) {
                console.log(result);
                result = JSON.parse(result);
                if (result.status) {
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

    function handleChangePassword(e) {
        e.preventDefault();
        if (activePasswordChange) {
            if (
                isEmptyObject(e.target.newPassword.value) &&
                isEmptyObject(e.target.confirmNewPassword.value) &&
                isEmptyObject(e.target.oldPassword.value) &&
                isEmptyObject(e.target.email.value)
            )
                return;
        } else {
            return;
        }
        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        $.ajax({
            url: "http://localhost:8000/changePw.php",
            type: "POST",
            data: {
                data: JSON.stringify(data),
                username: cookies.get("username"),
            },
            success: function (result) {
                console.log(result);
                result = JSON.parse(result);
                if (result.status) {
                    // todo send popup message to user
                    console.log("Password updated");
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
                        handleSubmit={handleChangePassword}
                    />
                )}
                {activeTab === "editProfile" && (
                    <EditProfile handleSubmit={handleEditProfileSubmit} />
                )}
                {activeTab === "notifications" && <Notifications />}
                {activeTab === "shippingAddress" && <ShippingAddress />}
                {activeTab === "following" && <Following />}
            </div>
        </div>
    );
};

const Account = ({
    handlePasswordChange,
    activePasswordChange,
    handleSubmit,
}) => (
    <div className={styles.accountTab}>
        <form onSubmit={handleSubmit}>
            <div>
                <h3>Email</h3>
                <input className={styles.emailBox} type="email" name="email" />
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
                        <input
                            className={styles.passwordBox}
                            type="password"
                            name="newPassword"
                        />
                        <label>Minimum 6 characters!</label>
                    </div>
                    <div>
                        <h3>Confirm New Password</h3>
                        <input
                            className={styles.passwordBox}
                            type="password"
                            name="confirmNewPassword"
                        />
                        <label>Enter same password</label>
                    </div>
                </div>
            )}
            <div className={styles.saveChangesContainer}>
                <h3>Current Password</h3>
                <input
                    className={styles.passwordBox}
                    type="password"
                    name="oldPassword"
                />
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
                    <h3>Surname</h3>
                    <input
                        className={styles.nameBox}
                        name="surname"
                        type="text"
                    />
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

const Following = () => <div>Following Settings</div>;

export default SettingsTab;
