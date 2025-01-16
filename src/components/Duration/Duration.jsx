import React, { useState, useRef, useEffect } from "react";
import styles from "./Duration.module.css";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";

function Duration({ updateBasics, formData, setDurationWarning }) {
    const [date, setDate] = useState(
        formData.duration.type === "specificDate"
            ? new Date(formData.duration.value)
            : null
    );
    const [day, setDay] = useState(
        formData.duration.type === "specificDate"
            ? new Date(formData.duration.value).getDate()
            : ""
    );
    const [month, setMonth] = useState(
        formData.duration.type === "specificDate"
            ? new Date(formData.duration.value).getMonth() + 1
            : ""
    );
    const [year, setYear] = useState(
        formData.duration.type === "specificDate"
            ? new Date(formData.duration.value).getFullYear()
            : ""
    );
    const [calendarOpen, setCalendarOpen] = useState(false);
    const buttonRef = useRef(null);
    const [durationOption, setDurationOption] = useState(
        formData.duration.type || "fixed"
    );
    const [numDays, setNumDays] = useState(
        formData.duration.type === "fixed" ? formData.duration.value : ""
    );
    const [weekWarning, setWeekWarning] = useState(false);
    const [yearWarning, setYearWarning] = useState(false);
    const [daysWarning, setDaysWarning] = useState(false);

    useEffect(() => {
        if (date) {
            const now = new Date();
            const weekafter = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate() + 7
            );
            const monthsafter = new Date(
                now.getFullYear(),
                now.getMonth() + 2,
                now.getDate()
            );
            if (date < weekafter) {
                setWeekWarning(true);
                setYearWarning(false);
            } else if (date > monthsafter) {
                setYearWarning(true);
                setWeekWarning(false);
            } else {
                setWeekWarning(false);
                setYearWarning(false);
            }
        }
    }, [date]);

    useEffect(() => {
        if (
            durationOption === "fixed" &&
            numDays &&
            parseInt(numDays, 10) < 7
        ) {
            setDaysWarning(true);
        } else if (
            durationOption === "fixed" &&
            numDays &&
            parseInt(numDays, 10) > 60
        ) {
            setDaysWarning(true);
        } else {
            setDaysWarning(false);
        }
    }, [durationOption, numDays]);

    useEffect(() => {
        if (durationOption === "fixed" && daysWarning) {
            setDurationWarning(true);
        } else if (
            durationOption === "specificDate" &&
            (weekWarning || yearWarning)
        ) {
            setDurationWarning(true);
        } else {
            setDurationWarning(false);
        }
    }, [durationOption, daysWarning, weekWarning, yearWarning]);

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        setDay(selectedDate.getDate());
        setMonth(selectedDate.getMonth() + 1);
        setYear(selectedDate.getFullYear());
        setCalendarOpen(false);

        updateBasics("duration", {
            type: "specificDate",
            value: selectedDate.toISOString(),
        });
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
            let selectedDate = new Date(newYear, newMonth - 1, newDay);

            const now = new Date();
            const weekafter = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate() + 7
            );
            const yearsafter = new Date(
                now.getFullYear() + 10,
                now.getMonth(),
                now.getDate()
            );
            if (selectedDate < weekafter) {
                setWeekWarning(true);
                setYearWarning(false);
                selectedDate = weekafter;
            } else if (selectedDate > yearsafter) {
                setYearWarning(true);
                setWeekWarning(false);
                selectedDate = yearsafter;
            } else {
                setWeekWarning(false);
                setYearWarning(false);
            }

            updateBasics("duration", {
                type: "specificDate",
                value: selectedDate.toISOString(),
            });
        }
    };

    const handleNumDaysChange = (value) => {
        setNumDays(value);
        updateBasics("duration", { type: "fixed", value });
    };

    const validateAndSetDate = () => {
        let newDay = parseInt(day, 10);
        let newMonth = parseInt(month, 10);
        let newYear = parseInt(year, 10);
        const currentYear = new Date().getFullYear();

        if (newDay < 1) newDay = 1;
        if (newDay > 31) newDay = 31;
        if (newMonth < 1) newMonth = 1;
        if (newMonth > 12) newMonth = 12;
        if (newYear < currentYear) newYear = currentYear;
        if (newYear > 3000) newYear = 3000;

        setDay(newDay);
        setMonth(newMonth);
        setYear(newYear);

        const selectedDate = new Date(newYear, newMonth - 1, newDay);

        // const now = new Date();
        // const weekafter = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
        // const yearsafter = new Date(now.getFullYear() + 10, now.getMonth(), now.getDate());
        // if (selectedDate < weekafter) {
        //     setWeekWarning(true);
        //     setYearWarning(false);
        //     setDate(weekafter);
        // } else if (selectedDate > yearsafter) {
        //     setYearWarning(true);
        //     setWeekWarning(false);
        //     setDate(yearsafter);
        // } else {
        //     setWeekWarning(false);
        //     setYearWarning(false);
        //     setDate(selectedDate);
        // }

        setDate(selectedDate);
        updateBasics("duration", {
            type: "specificDate",
            value: selectedDate.toISOString(),
        });
    };

    const validateDays = () => {
        let newNumDays = parseInt(numDays, 10);
        if (newNumDays < 7) newNumDays = 7;
        if (newNumDays > 60) newNumDays = 60;

        setNumDays(newNumDays);
        updateBasics("duration", { type: "fixed", value: newNumDays });
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
                    <label htmlFor="numDays">Number of days (7-60):</label>
                    <input
                        type="number"
                        id="numDays"
                        min="1"
                        max="60"
                        value={numDays}
                        onChange={(e) => handleNumDaysChange(e.target.value)}
                        onBlur={validateDays}
                        className={`${styles.input} ${
                            daysWarning ? styles.invalidInput : ""
                        }`}
                    />
                    {daysWarning && (
                        <div className={styles.warning}>
                            <p>
                                Warning: The campaign duration must be between 7
                                and 60 days.
                            </p>
                        </div>
                    )}
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
                                onChange={(e) =>
                                    handleInputChange("day", e.target.value)
                                }
                                onBlur={validateAndSetDate}
                                className={`${styles.input} ${
                                    weekWarning || yearWarning
                                        ? styles.invalidInput
                                        : ""
                                }`}
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
                                onChange={(e) =>
                                    handleInputChange("month", e.target.value)
                                }
                                onBlur={validateAndSetDate}
                                className={`${styles.input} ${
                                    weekWarning || yearWarning
                                        ? styles.invalidInput
                                        : ""
                                }`}
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
                                onChange={(e) =>
                                    handleInputChange("year", e.target.value)
                                }
                                onBlur={validateAndSetDate}
                                className={`${styles.input} ${
                                    weekWarning || yearWarning
                                        ? styles.invalidInput
                                        : ""
                                }`}
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
                    {weekWarning && (
                        <div className={styles.warning}>
                            <p>
                                Warning: The campaign duration must be at least
                                7 days.
                            </p>
                        </div>
                    )}
                    {yearWarning && (
                        <div className={styles.warning}>
                            <p>
                                Warning: The campaign duration must be at most 2
                                months.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Duration;
