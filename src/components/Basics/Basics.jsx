import React, { useState, useRef } from 'react';
import styles from './Basics.module.css';
import CustomDatePicker from '../CustomDatePicker/CustomDatePicker';

function Basics() {
    const [durationOption, setDurationOption] = useState('fixed');
    const [numDays, setNumDays] = useState('');
    const [video, setVideo] = useState(null);
    const [date, setDate] = useState(null);
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [date2, setDate2] = useState(null);
    const [day2, setDay2] = useState('');
    const [month2, setMonth2] = useState('');
    const [year2, setYear2] = useState('');
    const [calendarOpen1, setCalendarOpen1] = useState(false);
    const [calendarOpen2, setCalendarOpen2] = useState(false);
    const buttonRef1 = useRef(null);
    const buttonRef2 = useRef(null);
    const [images, setImages] = useState([]);

    const handleDurationChange = (e) => {
        setDurationOption(e.target.value);
        if (e.target.value === 'fixed') {
            setNumDays('');
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 4) {
            alert('You can upload up to 4 photos.');
            return;
        }
        const newImages = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(URL.createObjectURL(file));
        }
    };

    const handleDateChange1 = (selectedDate) => {
        setDate(selectedDate);
        setDay(selectedDate.getDate());
        setMonth(selectedDate.getMonth() + 1);
        setYear(selectedDate.getFullYear());
        setCalendarOpen1(false);
    };

    const handleDateChange2 = (selectedDate) => {
        setDate2(selectedDate);
        setDay2(selectedDate.getDate());
        setMonth2(selectedDate.getMonth() + 1);
        setYear2(selectedDate.getFullYear());
        setCalendarOpen2(false);
    };

    const handleCalendarToggle = (buttonRef) => {
        if (buttonRef === buttonRef1) {
            setCalendarOpen1((prev) => !prev);
        } else {
            setCalendarOpen2((prev) => !prev);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Start with the Basics</h1>
            <div className={styles.formWrapper}>
                <div className={styles.description}>
                    <h2>Project Details</h2>
                    <p>Make it easy for people to learn about your project.</p>
                    <p>Write a clear, brief title and subtitle to help people quickly understand your project.</p>
                </div>
                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="projectTitle">Title</label>
                        <input
                            type="text"
                            id="projectTitle"
                            placeholder="e.g., The Community Microscope Kit"
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="projectSubtitle">Subtitle</label>
                        <input
                            type="text"
                            id="projectSubtitle"
                            placeholder="e.g., Explore the microscopic world with an affordable kit"
                            className={styles.input}
                        />
                    </div>
                </form>
            </div>

            <div className={styles.section}>
                <div className={styles.formWrapper}>
                    <div className={styles.description}>
                        <h2>Project Category</h2>
                        <p>Choose a primary category and subcategory to help backers find your project.</p>
                        <p>Your second subcategory will help us provide more relevant guidance for your project. It won’t display on your project page or affect how it appears in search results.</p>
                    </div>
                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="primaryCategory">Primary Category</label>
                            <select id="primaryCategory" className={styles.input}>
                                <option value="art">Art</option>
                                <option value="music">Music</option>
                                <option value="tech">Technology</option>
                            </select>
                            <label htmlFor="primarySubcategory">Primary Subcategory</label>
                            <select id="primarySubcategory" className={styles.input}>
                                <option value="none">--No subcategory--</option>
                                <option value="painting">Painting</option>
                                <option value="sculpture">Sculpture</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="secondaryCategory">Secondary Category</label>
                            <select id="secondaryCategory" className={styles.input}>
                                <option value="art">Art</option>
                                <option value="music">Music</option>
                                <option value="tech">Technology</option>
                            </select>
                            <label htmlFor="secondarySubcategory">Secondary Subcategory</label>
                            <select id="secondarySubcategory" className={styles.input}>
                                <option value="none">--No subcategory--</option>
                                <option value="painting">Painting</option>
                                <option value="sculpture">Sculpture</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Project Location</h2>
                <p>Enter the location that best describes where your project is based.</p>
                <input
                    type="text"
                    placeholder="Start typing your location..."
                    className={styles.input}
                />
            </div>

            <div className={styles.section}>
                <h2>Project Image</h2>
                <p>Add an image that clearly represents your project. Choose one that looks good at different sizes.</p>
                <div className={styles.uploadWrapper}>
                    <button
                        type="button"
                        className={styles.button}
                        onClick={() => document.getElementById('imageInput').click()}
                    >
                        Upload images
                    </button>
                    <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        style={{ display: 'none' }}
                        multiple
                        onChange={handleImageUpload}
                    />
                    <div className={styles.previewContainer}>
                        {images.map((src, index) => (
                            <img key={index} src={src} alt={`Uploaded ${index + 1}`} className={styles.previewImage} />
                        ))}
                    </div>
                    <p>Drop images here, or select files. JPG, PNG, GIF, or WEBP up to 50MB each. Max 4 images.</p>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Project Video (optional)</h2>
                <p>Add a video to showcase your project. Recommended file formats are MP4 or MOV.</p>
                <div className={styles.uploadWrapper}>
                    <button
                        type="button"
                        className={styles.button}
                        onClick={() => document.getElementById('videoInput').click()}
                    >
                        Upload a video
                    </button>
                    <input
                        type="file"
                        id="videoInput"
                        accept="video/*"
                        style={{ display: 'none' }}
                        onChange={handleVideoUpload}
                    />
                    {video && <video src={video} controls className={styles.previewVideo} />}
                    <p>Drop a video here, or select a file. MP4 or MOV up to 500MB.</p>
                </div>
            </div>

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
                            disabled={calendarOpen1}
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
                            disabled={calendarOpen1}
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
                            disabled={calendarOpen1}
                        />
                    </div>
                    <button
                        type="button"
                        ref={buttonRef1}
                        onClick={() => handleCalendarToggle(buttonRef1)}
                        className={styles.calendarButton}
                    >
                        <i className="fa fa-calendar"></i>
                    </button>
                </div>
                <CustomDatePicker
                    selected={date}
                    onChange={handleDateChange1}
                    buttonRef={buttonRef1}
                    open={calendarOpen1}
                />
            </div>

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
                                    id="day2"
                                    min="1"
                                    max="31"
                                    value={day2}
                                    onChange={(e) => setDay2(e.target.value)}
                                    className={styles.input}
                                    disabled={calendarOpen2}
                                />
                            </div>
                            <div className={styles.dateInputGroup}>
                                <label htmlFor="month">Month</label>
                                <input
                                    type="number"
                                    id="month2"
                                    min="1"
                                    max="12"
                                    value={month2}
                                    onChange={(e) => setMonth2(e.target.value)}
                                    className={styles.input}
                                    disabled={calendarOpen2}
                                />
                            </div>
                            <div className={styles.dateInputGroup}>
                                <label htmlFor="year">Year</label>
                                <input
                                    type="number"
                                    id="year2"
                                    min="2024"
                                    value={year2}
                                    onChange={(e) => setYear2(e.target.value)}
                                    className={styles.input}
                                    disabled={calendarOpen2}
                                />
                            </div>
                            <button
                                type="button"
                                ref={buttonRef2}
                                onClick={() => handleCalendarToggle(buttonRef2)}
                                className={styles.calendarButton}
                            >
                                <i className="fa fa-calendar"></i>
                            </button>
                        </div>
                        <CustomDatePicker
                            selected={date2}
                            onChange={handleDateChange2}
                            buttonRef={buttonRef2}
                            open={calendarOpen2}
                        />
                    </div>
                )}
            </div>

            <button type="submit" className={styles.button}>Save</button>
        </div>
    );
}

export default Basics;
