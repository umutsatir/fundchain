import styles from "../styles/Settings.module.css";
import SettingsTab from "../components/SettingsTab/SettingsTab";

function Settings({ handleNotification }) {
    return (
        <div className={styles.body}>
            <h1 className={styles.settingsTitle}>Settings</h1>
            <div className={styles.settingsWrapper}>
                <SettingsTab handleNotification={handleNotification} />
            </div>
        </div>
    );
}

export default Settings;
