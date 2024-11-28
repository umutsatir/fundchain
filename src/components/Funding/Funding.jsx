import { useState, useEffect } from "react";
import styles from "./Funding.module.css";
import { Cookies } from "react-cookie";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

const Funding = (props) => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [pledged, setPledged] = useState(100000);
    const [goal, setGoal] = useState(300000);
    const [backers, setBackers] = useState(250);
    const [daysLeft, setDaysLeft] = useState(36);
    const [isSaved, setIsSaved] = useState(false);
    const [loggedIn, setLoggedIn] = useState(cookies.get("loggedIn"));

    const progress = (pledged / goal) * 100;

    useEffect(() => {
        if (!loggedIn) return;
        $.ajax({
            url: "http://localhost:8000/checkSave.php",
            type: "POST",
            data: {
                projectId: props.id,
                username: cookies.get("username"),
            },
            success: function (data) {
                data = JSON.parse(data);
                if (data.status) {
                    setIsSaved(true);
                } else {
                    setIsSaved(false);
                }
            },
            error: function (error) {
                console.log(error);
            },
        });
    }, [props]);

    const setSavedProject = () => {
        if (!loggedIn) navigate("/login");
        $.ajax({
            url: "http://localhost:8000/save.php",
            type: "POST",
            data: {
                projectId: props.id,
                username: cookies.get("username"),
                willBeSaved: !isSaved,
            },
            success: function (data) {
                data = JSON.parse(data);
                if (data.status) {
                    setIsSaved(!isSaved);
                } else {
                    console.log(data.message);
                }
            },
            error: function (error) {
                console.log(error);
            },
        });
    };

    return (
        <div className={styles.progressContainer}>
            <div className={styles.progressBackground}>
                <div
                    className={styles.progressBar}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className={styles.progressInfo}>
                <h1>{pledged.toLocaleString()}$</h1>
                <p>pledged of {goal.toLocaleString()}$ goal</p>
                <h1>{backers}</h1>
                <p>backers</p>
                <h1>{daysLeft}</h1>
                <p>days to go</p>
            </div>
            <div className={styles.buttons}>
                <button className={styles.backButton}>Back this project</button>
                <button className={styles.shareButton}>Share</button>
                <button
                    className={`${styles.remindButton} ${
                        isSaved ? styles.saved : ""
                    }`}
                    onClick={setSavedProject}
                >
                    <i className="fa fa-bookmark"></i> Remind me
                </button>
            </div>
        </div>
    );
};

export default Funding;
