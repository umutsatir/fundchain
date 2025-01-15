import React, { useState } from 'react';
import styles from './Location.module.css';

function Location({updateBasics, formData}) {
    const [warning, setWarning] = useState(false);

    const handleInputChange = (e) => {
        const { id } = e.target;
        let { value } = e.target;

        if (value.length > 100 || value.length < 5) {
            setWarning(true);
            value = value.slice(0, 100);
        } else {
            setWarning(false);
        }
        updateBasics(id, value);
    };

    return (
        <div className={styles.section}>
            <h2>Project Location</h2>
            <p>Enter the location that best describes where your project is based.</p>
            <input
                type="text"
                placeholder="Start typing your location..."
                className={`${styles.input} ${warning ? styles.invalidInput : ''}`}
                id='location'
                value={formData.location}
                onChange={handleInputChange}
            />
            {warning && (
                <div className={styles.warning}>
                    <p>Warning: Location should consist of minimum 5 and maximum 100 characters.</p>
                </div>
            )}
        </div>
    );
}

export default Location;