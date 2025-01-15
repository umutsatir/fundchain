import React, { useState } from "react";
import styles from "./Details.module.css";

function Details({ updateBasics, formData }) {
    const [titleWarning, setTitleWarning] = useState(false);
    const [descWarning, setDescWarning] = useState(false);

    const handleTitleChange = (e) => {
        const { id } = e.target;
        let { value } = e.target;

        if (value.length > 100 || value.length < 5) {
            setTitleWarning(true);
            value = value.slice(0, 100);
        } else {
            setTitleWarning(false);
        }
        
        updateBasics(id, value);
    };

    const handleDescChange = (e) => {
        const { id } = e.target;
        let { value } = e.target;
    
        if (value.length > 500 || value.length < 10) {
            setDescWarning(true);
            value = value.slice(0, 500);
        } else {
            setDescWarning(false);
        }
    
        updateBasics(id, value);
    };
    

    return (
        <div className={styles.formWrapper}>
            <div className={styles.description}>
                <h2>Project Details</h2>
                <p>Make it easy for people to learn about your project.</p>
                <p>
                    Write a clear, brief title to help people quickly understand
                    your project.
                </p>
            </div>
            <form className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        placeholder="e.g., The Community Microscope Kit"
                        className={`${styles.input} ${titleWarning ? styles.invalidInput : ''}`}
                        onChange={handleTitleChange}
                    />
                    {titleWarning && (
                        <div className={styles.warning}>
                            <p>Warning: Title should consist of minimum 5 and maximum 50 characters.</p>
                        </div>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        id="description"
                        rows="5"
                        value={formData.description}
                        className={`${styles.input} ${descWarning ? styles.invalidInput : ''}`}
                        onChange={handleDescChange}
                    />
                    {descWarning && (
                        <div className={styles.warning}>
                            <p>Warning: Description should consist of minimum 10 and maximum 500 characters.</p>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Details;
