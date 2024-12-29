import React, { useState, useRef } from "react";
import styles from "./Duration.module.css";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";

function Duration({ updateBasics, formData }) {
    const [date, setDate] = useState(formData.duration.type === "specificDate" ? new Date(formData.duration.value) : null);
    const [day, setDay] = useState(formData.duration.type === "specificDate" ? new Date(formData.duration.value).getDate() : "");
    const [month, setMonth] = useState(formData.duration.type === "specificDate" ? new Date(formData.duration.value).getMonth() + 1 : "");
    const [year, setYear] = useState(formData.duration.type === "specificDate" ? new Date(formData.duration.value).getFullYear() : "");
    const [calendarOpen, setCalendarOpen] = useState(false);
    const buttonRef = useRef(null);
    const [durationOption, setDurationOption] = useState(formData.duration.type || "fixed");
    const [numDays, setNumDays] = useState(formData.duration.type === "fixed" ? formData.duration.value : "");

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        setDay(selectedDate.getDate());
        setMonth(selectedDate.getMonth() + 1);
        setYear(selectedDate.getFullYear());
        setCalendarOpen(false);

        updateBasics("duration", { type: "specificDate", value: selectedDate.toISOString() });
    };

    const handleCalendarToggle = () => {
        setCalendarOpen(!calendarOpen);
    };

    const handleDurationChange = (e) => {
        const value = e.target.value;
        setDurationOption(value);

        if (value === "fixed") {
            setNumDays("");
            updateBasics("duration", { type: "fixed", value: "" });
        } else if (value === "specificDate") {
            updateBasics("duration", { type: "specificDate", value: null });
        }
    };

    const handleInputChange = (field, value) => {
        let newDay = day;
        let newMonth = month;
        let newYear = year;

        if (field === "day") newDay = value;
        if (field === "month") newMonth = value;
        if (field === "year") newYear = value;

        if (field === "day") setDay(value);
        if (field === "month") setMonth(value);
        if (field === "year") setYear(value);

        if (newDay && newMonth && newYear) {
            const selectedDate = new Date(newYear, newMonth - 1, newDay);
            updateBasics("duration", { type: "specificDate", value: selectedDate.toISOString() });
        }
    };

    const handleNumDaysChange = (value) => {
        setNumDays(value);
        updateBasics("duration", { type: "fixed", value });
    };

    return (
        <div className={styles.section}>
            <h2>Campaign Duration</h2>
            <p>Choose how long your campaign will run.</p>
            <div className={styles.durationWrapper}>
                <label>
                    <input
                        type="radio"
                        name="duration"
                        value="fixed"
                        checked={durationOption === "fixed"}
                        onChange={handleDurationChange}
                    />
                    Fixed number of days
                </label>
                <label>
                    <input
                        type="radio"
                        name="duration"
                        value="specificDate"
                        checked={durationOption === "specificDate"}
                        onChange={handleDurationChange}
                    />
                    End on a specific date & time
                </label>
            </div>

            {durationOption === "fixed" && (
                <div className={styles.fixedDuration}>
                    <label htmlFor="numDays">Number of days (up to 60):</label>
                    <input
                        type="number"
                        id="numDays"
                        min="1"
                        max="60"
                        value={numDays}
                        onChange={(e) => handleNumDaysChange(e.target.value)}
                        className={styles.input}
                    />
                </div>
            )}

            {durationOption === "specificDate" && (
                <div className={styles.specificDate}>
                    <div className={styles.dateWrapper}>
                        <div className={styles.dateInputGroup}>
                            <label htmlFor="day">Day</label>
                            <input
                                type="number"
                                id="day"
                                min="1"
                                max="31"
                                value={day}
                                onChange={(e) => handleInputChange("day", e.target.value)}
                                className={styles.input}
                                disabled={calendarOpen}
                            />
                        </div>
                        <div className={styles.dateInputGroup}>
                            <label htmlFor="month">Month</label>
                            <input
                                type="number"
                                id="month"
                                min="1"
                                max="12"
                                value={month}
                                onChange={(e) => handleInputChange("month", e.target.value)}
                                className={styles.input}
                                disabled={calendarOpen}
                            />
                        </div>
                        <div className={styles.dateInputGroup}>
                            <label htmlFor="year">Year</label>
                            <input
                                type="number"
                                id="year"
                                min="2024"
                                value={year}
                                onChange={(e) => handleInputChange("year", e.target.value)}
                                className={styles.input}
                                disabled={calendarOpen}
                            />
                        </div>
                        <button
                            type="button"
                            ref={buttonRef}
                            onClick={() => handleCalendarToggle()}
                            className={styles.calendarButton}
                        >
                            <i className="fa fa-calendar"></i>
                        </button>
                    </div>
                    <CustomDatePicker
                        selected={date}
                        onChange={handleDateChange}
                        buttonRef={buttonRef}
                        open={calendarOpen}
                    />
                </div>
            )}
        </div>
    );
}

export default Duration;
