import "./SettingsTab.css";
import React, { useState } from "react";

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
    <div className="settings-container">
      <div className="tabs">
        <button
            className={activeTab === "account" ? "active" : ""}
            onClick={() => handleTabClick("account")}
        >
            Account
        </button>
        <button
            className={activeTab === "editProfile" ? "active" : ""}
            onClick={() => handleTabClick("editProfile")}
        >
            Edit Profile
        </button>
        <button
            className={activeTab === "notifications" ? "active" : ""}
            onClick={() => handleTabClick("notifications")}
        >
            Notifications
        </button>
        <button
            className={activeTab === "paymentMethods" ? "active" : ""}
            onClick={() => handleTabClick("paymentMethods")}
        >
            Payment Methods
        </button>
        <button
            className={activeTab === "shippingAddress" ? "active" : ""}
            onClick={() => handleTabClick("shippingAddress")}
        >
            Shipping Address
        </button>
        <button
            className={activeTab === "following" ? "active" : ""}
            onClick={() => handleTabClick("following")}
        >
            Following
        </button>
        </div>
      <div className="content">
        {activeTab === "account" && <Account handlePasswordChange={handlePasswordChange} activePasswordChange={activePasswordChange} />}
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
  <div className="account-tab">
    <form>
      <div>
        <h3>Email</h3>
        <input className="email-box" type="text" />
      </div>
      <div>
        <h3>Password</h3>
        <button 
          className={`change-password-button ${activePasswordChange ? 'hover-active' : ''}`} 
          type="button" 
          onClick={handlePasswordChange}
        >
          Change Password
        </button>
      </div>
      {activePasswordChange && (
        <div className="password-change-fields">
          <div>
            <h3>New Password</h3>
            <input className="password-box" type="password" />
            <label>Minimum 6 characters!</label>
          </div>
          <div>
            <h3>Confirm New Password</h3>
            <input className="password-box" type="password" />
            <label>Enter same password</label>
          </div>
        </div>
      )}
      <div className="save-changes-container">
        <h3>Current Password</h3>
        <input className="password-box" type="password" />
        <button className="save-button" type="submit">Save Changes</button>
      </div>
    </form>
  </div>
);

const EditProfile = () => (
  <div className="edit-profile-tab">
    <form>
      <div>
        <div>
          <h3>Name</h3>
          <input className="name-box" type="text" />
        </div>
        <div>
          <h3>Avatar</h3>
          <input className="avatar-box" type="file" />
        </div>
        <div>
          <h3>Location</h3>
          <input className="location-box" type="text" />
        </div>
        <div>
          <h3>Time Zone</h3>
          <select className="timezone-box">
            <option value="gmt">GMT</option>
            <option value="gmt1">GMT+1</option>
            <option value="gmt2">GMT+2</option>
          </select>
        </div>
        <button className="save-button" type="submit">Save Changes</button>
      </div>
      
      <div>
        <h3>Biography</h3>
        <textarea className="biography-box" />
      </div>
      
    </form>
  </div>
);

/* These tabs can be configure or delete */ 
const Notifications = () => <div>Notification Settings</div>;
const PaymentMethods = () => (
  <div className="payment-tab">
    <form>
      <button className="wallet-button" type="button">Link Wallet</button>
    </form>
  </div>
);
const ShippingAddress = () => <div>Shipping Address</div>;
const Following = () => <div>Following Settings</div>;

export default SettingsTab;
