import React, { useState } from "react";
import styles from "./SettingsTab.module.css";
import $, { isEmptyObject } from "jquery";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { apiUrl } from "../../api_url";

const SettingsTab = ({ handleNotification }) => {
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
            if (key === "avatar") {
                data[key] = URL.createObjectURL(value);
            } else data[key] = value;
        });

        $.ajax({
            url: apiUrl + "/editProfile.php",
            type: "POST",
            data: {
                data: JSON.stringify(data),
                username: cookies.get("username"),
            },
            success: function (result) {
                console.log(result);
                result = JSON.parse(result);
                if (result.status) {
                    handleNotification(
                        "Profile updated successfully",
                        "success"
                    );
                } else {
                    handleNotification(result.message, "error");
                }
            },
            error: function (error) {
                handleNotification("Failed to update profile", "error");
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

        if (!checkPassword(e.target.newPassword.value)) return;

        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        $.ajax({
            url: apiUrl + "/changePw.php",
            type: "POST",
            data: {
                data: JSON.stringify(data),
                username: cookies.get("username"),
            },
            success: function (result) {
                result = JSON.parse(result);
                if (result.status) {
                    handleNotification(
                        "Password changed successfully",
                        "success"
                    );
                } else {
                    handleNotification(result.message, "error");
                }
            },
            error: function (error) {
                handleNotification("Failed to change password", "error");
                navigate("/error");
            },
        });
    }

    const checkPassword = (password) => {
        let valid = true;
        const newErrors = {
            password: "",
            confirmPassword: "",
        };

        if (!password) {
            newErrors.password = "Password is required.";
            valid = false;
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
            valid = false;
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password =
                "Password must contain at least one uppercase letter.";
            valid = false;
        } else if (!/[a-z]/.test(password)) {
            newErrors.password =
                "Password must contain at least one lowercase letter.";
            valid = false;
        } else if (!/[0-9]/.test(password)) {
            newErrors.password = "Password must contain at least one number.";
            valid = false;
        }
        // else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        //     newErrors.password = "Password must contain at least one special character.";
        //     valid = false;
        // }

        if (valid) return true;
        handleNotification("Error: " + newErrors.password, "error");
        return false;
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

export default SettingsTab;
