import React from "react";
import styles from "./Loading.module.css"; // CSS Modules import

function Loading() {
    return (
        <div className={styles.container}>
            <div className={styles.loader}></div>
        </div>
    );
}

export default Loading;
