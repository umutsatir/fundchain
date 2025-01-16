import React, { useState } from "react";
import styles from "./SettingsTab.module.css";
import $, { isEmptyObject } from "jquery";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { apiUrl } from "../../api_url";
import { countries } from "../Location/countries";

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

    const uploadImage = async (value) => {
        try {
            if (!value || value.name == "") return;
            // Upload files and get URLs
            const formData = new FormData();
            formData.append("image", value);

            const response = await fetch(apiUrl + "/uploadImage.php", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (data.status) {
                return data.url;
            } else {
                handleNotification("Failed to upload images", "error");
                return null;
            }
        } catch (error) {
            console.error("Image upload error:", error);
            handleNotification("Failed to upload images", "error");
        }
    };

    async function handleEditProfileSubmit(e) {
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
        for (const [key, value] of formData.entries()) {
            if (key === "avatar") {
                try {
                    const url = await uploadImage(value);
                    console.log("Image uploaded successfully", url);
                    data[key] = url;
                } catch (error) {
                    console.error("Image upload error:", error);
                    handleNotification("Failed to upload images", "error");
                }
            } else {
                data[key] = value;
            }
        }

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
                    <EditProfile
                        handleSubmit={handleEditProfileSubmit}
                        handleNotification={handleNotification}
                    />
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
                        <label>Minimum 8 characters!</label>
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

const EditProfile = ({ handleSubmit, handleNotification }) => {
    const validateFile = (file) => {
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
        if (file.size > 5 * 1024 * 1024) {
            return "File size should be less than 5MB.";
        }
        if (!validTypes.includes(file.type)) {
            return "Invalid file type. Only JPEG, PNG, and GIF are allowed.";
        }
        return null;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const error = validateFile(file);
        if (error) {
            handleNotification(error, "error");
            e.target.value = null;
        }
    };

    return (
        <div className={styles.editProfileTab}>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <h3>Name</h3>
                        <input
                            className={styles.nameBox}
                            name="name"
                            type="text"
                        />
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
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div>
                        <h3>Location</h3>
                        <select className={styles.locationBox} name="location">
                            <option value="">Select a country...</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className={styles.saveButton} type="submit">
                        Save Changes
                    </button>
                </div>

                <div>
                    <h3>Biography</h3>
                    <textarea
                        className={styles.biographyBox}
                        name="biography"
                    />
                </div>
            </form>
        </div>
    );
};

export default SettingsTab;
