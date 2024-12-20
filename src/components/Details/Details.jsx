import React from 'react';
import styles from './Details.module.css';

function Details({ updateBasics, formData }) {

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        updateBasics(id, value);
    };

    return (
        <div className={styles.formWrapper}>
            <div className={styles.description}>
                <h2>Project Details</h2>
                <p>Make it easy for people to learn about your project.</p>
                <p>Write a clear, brief title and subtitle to help people quickly understand your project.</p>
            </div>
            <form className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        placeholder="e.g., The Community Microscope Kit"
                        className={styles.input}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="subtitle">Subtitle</label>
                    <input
                        type="text"
                        id="subtitle"
                        value={formData.subtitle}
                        placeholder="e.g., Explore the microscopic world with an affordable kit"
                        className={styles.input}
                        onChange={handleInputChange}
                    />
                </div>
            </form>
        </div>
    );
}

export default Details;
