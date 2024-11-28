import styles from "../styles/Settings.module.css";
import SettingsTab from "../components/SettingsTab/SettingsTab";

function Settings() {
    return (
        <div className={styles.body}>
            <h1 className={styles.settingsTitle}>Settings</h1>
            <div className={styles.settingsWrapper}>
                <SettingsTab />
            </div>
        </div>
    );
}

export default Settings;
