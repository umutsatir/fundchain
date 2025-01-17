import React, { useState } from "react";
import styles from "./Location.module.css";
import { countries } from "./countries";

function Location({ updateBasics, formData, setLocationWarning }) {
    const [warning, setWarning] = useState(false);

    const handleInputChange = (e) => {
        const { id } = e.target;
        let { value } = e.target;

        if (value == "") {
            setWarning(true);
            setLocationWarning(true);
        } else {
            setWarning(false);
            setLocationWarning(false);
        }
        updateBasics(id, value);
    };

    return (
        <div className={styles.section}>
            <h2>Project Location</h2>
            <p>
                Enter the location that best describes where your project is
                based.
            </p>
            <select
                className={`${styles.input} ${
                    warning ? styles.invalidInput : ""
                }`}
                id="location"
                value={formData.location}
                onChange={handleInputChange}
            >
                <option value="">Select a country...</option>
                {countries.map((country, index) => (
                    <option key={index} value={country}>
                        {country}
                    </option>
                ))}
            </select>
            {warning && (
                <div className={styles.warning}>
                    <p>Warning: You should select a country to proceed.</p>
                </div>
            )}
        </div>
    );
}

export default Location;
