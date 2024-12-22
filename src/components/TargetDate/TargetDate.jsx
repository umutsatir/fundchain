import React, {useState, useRef} from 'react';
import styles from './TargetDate.module.css';
import CustomDatePicker from '../CustomDatePicker/CustomDatePicker';

function TargetDate() {
    const [date, setDate] = useState(null);
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [calendarOpen, setCalendarOpen] = useState(false);
    const buttonRef = useRef(null);

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        setDay(selectedDate.getDate());
        setMonth(selectedDate.getMonth() + 1);
        setYear(selectedDate.getFullYear());
        setCalendarOpen(false);
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
                        onChange={(e) => setDay(e.target.value)}
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
                        onChange={(e) => setMonth(e.target.value)}
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
                        onChange={(e) => setYear(e.target.value)}
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
    );
}

export default TargetDate;