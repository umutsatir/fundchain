import React, { useEffect, useState } from "react";
import Proptypes from "prop-types";
import "./Cards.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import $ from "jquery";
import { Cookies } from "react-cookie";

function Cards(props) {
    const [isSaved, setIsSaved] = useState(false); //Is clicked the saved button?
    const cookies = new Cookies();

    useEffect(() => {
        if (cookies.get("loggedIn") == false) {
            return;
        }

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
    }, []);

    const handleSaveClick = () => {
        if (cookies.get("loggedIn") == false) {
            window.location.href = "/login";
            return;
        }

        setSavedProject();
    };

    const setSavedProject = () => {
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

    const handlePage = (e) => {
        e.preventDefault();
        window.location.href = "/project/" + props.id;
    };

    return (
        <div className="card">
            <img className="card-image" src={props.img} alt="Photo" />
            <div className="card-header">
                <img
                    className="card-subimage"
                    src={props.subimg}
                    alt="SubPhoto"
                />
                <div className="card-proporties">
                    <h2 className="card-title" onClick={(e) => handlePage(e)}>
                        {props.title}
                    </h2>
                    <p className="card-owner">{props.owner}</p>
                    <p className="card-deadline">
                        <i className="fa fa-clock"></i> {/* time symbol */}
                        {props.deadline} days left
                    </p>
                </div>
                {/* save button */}
                <button
                    className={`card-saved-button ${isSaved ? "saved" : ""}`}
                    onClick={handleSaveClick}
                >
                    <i className="fa fa-bookmark"></i>{" "}
                    {/* FontAwesome Save Icon */}
                </button>
            </div>
        </div>
    );
}

Cards.proptypes = {
    id: Proptypes.number,
    img: Proptypes.string,
    subimg: Proptypes.string,
    title: Proptypes.string,
    owner: Proptypes.string,
    deadline: Proptypes.number,
};

export default Cards;
