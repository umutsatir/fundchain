import React from "react";
import styles from "../styles/DisplayProjects.module.css";
import CreateProjects from "../components/CreateProjects/CreateProjects";

function DisplayProjects() {
    return (
        <div className={styles.tabContainer}>
            <CreateProjects />
        </div>
    );
}

export default DisplayProjects;
