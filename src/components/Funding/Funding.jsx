import { useState, useEffect } from "react";
import "./Funding.css";
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
        <div className="progress-container">
            <div className="progress-background">
                <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="progress-info">
                <h1>{pledged.toLocaleString()}$</h1>
                <p>pledged of {goal.toLocaleString()}$ goal</p>
                <h1>{backers}</h1>
                <p>backers</p>
                <h1>{daysLeft}</h1>
                <p>days to go</p>
            </div>
            <div className="buttons">
                <button className="back-button">Back this project</button>
                <button className="share-button">Share</button>
                <button
                    className={`remind-button ${isSaved ? "saved" : ""}`}
                    onClick={setSavedProject}
                >
                    <i className="fa fa-bookmark"></i> {}
                    Remind me
                </button>
            </div>
        </div>
    );
};

export default Funding;
