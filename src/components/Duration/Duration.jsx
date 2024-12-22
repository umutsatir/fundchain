import React, {useState, useRef} from 'react';
import styles from './Duration.module.css';
import CustomDatePicker from '../CustomDatePicker/CustomDatePicker';

function Duration() {
    const [date, setDate] = useState(null);
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [calendarOpen, setCalendarOpen] = useState(false);
    const buttonRef = useRef(null);
    const [durationOption, setDurationOption] = useState('fixed');
    const [numDays, setNumDays] = useState('');

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

    const handleDurationChange = (e) => {
        setDurationOption(e.target.value);
        if (e.target.value === 'fixed') {
            setNumDays('');
        }
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
                        checked={durationOption === 'fixed'}
                        onChange={handleDurationChange}
                    />
                    Fixed number of days
                </label>
                <label>
                    <input
                        type="radio"
                        name="duration"
                        value="specificDate"
                        checked={durationOption === 'specificDate'}
                        onChange={handleDurationChange}
                    />
                    End on a specific date & time
                </label>
            </div>

            {durationOption === 'fixed' && (
                <div className={styles.fixedDuration}>
                    <label htmlFor="numDays">Number of days (up to 60):</label>
                    <input
                        type="number"
                        id="numDays"
                        min="1"
                        max="60"
                        value={numDays}
                        onChange={(e) => setNumDays(e.target.value)}
                        className={styles.input}
                    />
                </div>
            )}

            {durationOption === 'specificDate' && (
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
            )}
        </div>
    );
}

export default Duration;