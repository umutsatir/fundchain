import React from 'react';
import styles from './Location.module.css';

function Location() {
    return (
        <div className={styles.section}>
            <h2>Project Location</h2>
            <p>Enter the location that best describes where your project is based.</p>
            <input
                type="text"
                placeholder="Start typing your location..."
                className={styles.input}
            />
        </div>
    );
}

export default Location;