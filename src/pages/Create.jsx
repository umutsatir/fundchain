import React from "react";
import styles from "../styles/Create.module.css";
import CreateTab from "../components/CreateTab/CreateTab";

const Create = ({ handleNotification }) => {
    return (
        <div className={styles.tabContainer}>
            <CreateTab handleNotification={handleNotification} />
        </div>
    );
};

export default Create;
