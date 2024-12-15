import React from 'react';
import styles from './Details.module.css';

function Details() {
    return (
    <div className={styles.formWrapper}>
        <div className={styles.description}>
            <h2>Project Details</h2>
            <p>Make it easy for people to learn about your project.</p>
            <p>Write a clear, brief title and subtitle to help people quickly understand your project.</p>
        </div>
        <form className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="projectTitle">Title</label>
                <input
                    type="text"
                    id="projectTitle"
                    placeholder="e.g., The Community Microscope Kit"
                    className={styles.input}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="projectSubtitle">Subtitle</label>
                <input
                    type="text"
                    id="projectSubtitle"
                    placeholder="e.g., Explore the microscopic world with an affordable kit"
                    className={styles.input}
                />
            </div>
        </form>
    </div>
    );
}

export default Details;