import React from 'react';
import styles from './Location.module.css';

function Location({updateBasics, formData}) {

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        updateBasics(id, value); // `id`'yi key olarak kullan
    };

    return (
        <div className={styles.section}>
            <h2>Project Location</h2>
            <p>Enter the location that best describes where your project is based.</p>
            <input
                type="text"
                placeholder="Start typing your location..."
                className={styles.input}
                id='location'
                value={formData.location}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default Location;