import React, { useState, useRef } from 'react';
import styles from './TargetDate.module.css';
import CustomDatePicker from '../CustomDatePicker/CustomDatePicker';

function TargetDate({ updateBasics, formData}) {
    const [date, setDate] = useState(formData.targetDate ? new Date(formData.targetDate) : null);
    const [day, setDay] = useState(formData.targetDate ? new Date(formData.targetDate).getDate() : '');
    const [month, setMonth] = useState( formData.targetDate ? new Date(formData.targetDate).getMonth() + 1 : '');
    const [year, setYear] = useState( formData.targetDate ? new Date(formData.targetDate).getFullYear() : '');
    const [calendarOpen, setCalendarOpen] = useState(false);
    const buttonRef = useRef(null);

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        setDay(selectedDate.getDate());
        setMonth(selectedDate.getMonth() + 1);
        setYear(selectedDate.getFullYear());
        setCalendarOpen(false);

        updateBasics('targetDate', selectedDate.toISOString());
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
            updateBasics("targetDate", selectedDate.toISOString());
        }
    };
    

    const handleCalendarToggle = () => {
        setCalendarOpen(!calendarOpen);
    };

    return (
        <div className={styles.section}>
            <h2>Target Launch Date (optional)</h2>
            <p>Select a target launch date for your project.</p>
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
                    onClick={handleCalendarToggle}
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
    );
}

export default TargetDate;
