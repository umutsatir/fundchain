import React, { useState, useEffect } from "react";
import styles from "./Details.module.css";

function Details({ updateBasics, formData, setDetailsWarning }) {
    const [titleWarning, setTitleWarning] = useState(false);
    const [descWarning, setDescWarning] = useState(false);

    const handleTitleChange = (e) => {
        const { id } = e.target;
        let { value } = e.target;

        if (value.length != 0 && (value.length > 65 || value.length < 5)) {
            setTitleWarning(true);
            value = value.slice(0, 65);
        } else {
            setTitleWarning(false);
        }

        updateBasics(id, value);
    };

    const handleDescChange = (e) => {
        const { id } = e.target;
        let { value } = e.target;

        if (value.length != 0 && (value.length > 100 || value.length < 5)) {
            setDescWarning(true);
            value = value.slice(0, 100);
        } else {
            setDescWarning(false);
        }

        updateBasics(id, value);
    };

    useEffect(() => {
        if (titleWarning || descWarning) {
            setDetailsWarning(true);
        } else {
            setDetailsWarning(false);
        }
    }, [titleWarning, descWarning]);

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
                        className={`${styles.input} ${
                            titleWarning ? styles.invalidInput : ""
                        }`}
                        onChange={handleTitleChange}
                    />
                    {titleWarning && (
                        <div className={styles.warning}>
                            <p>
                                Warning: Title should consist of minimum 5 and
                                maximum 65 characters.
                            </p>
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
                        className={`${styles.input} ${
                            descWarning ? styles.invalidInput : ""
                        }`}
                        onChange={handleDescChange}
                    />
                    {descWarning && (
                        <div className={styles.warning}>
                            <p>
                                Warning: Description should consist of minimum 5
                                and maximum 100 characters.
                            </p>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Details;
