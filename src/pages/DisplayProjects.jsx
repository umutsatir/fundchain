import React from "react";
import styles from "../styles/DisplayProjects.module.css";
import CreateProjects from "../components/CreateProjects/CreateProjects";

function DisplayProjects({ handleNotification }) {
    return (
        <div className={styles.tabContainer}>
            <CreateProjects handleNotification={handleNotification} />
        </div>
    );
}

export default DisplayProjects;
