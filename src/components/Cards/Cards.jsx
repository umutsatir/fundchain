import React from "react";
import PropTypes from "prop-types";
import "./Cards.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import $ from "jquery";
import { Cookies } from "react-cookie";

function Cards(props) {
    const cookies = new Cookies();

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
                willBeSaved: !props.isSaved,
            },
            success: function (data) {
                data = JSON.parse(data);
                if (data.status) {
                    props.onSaveToggle(props.id);
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
                <div className="card-properties">
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
                    className={`card-saved-button ${
                        props.isSaved ? "saved" : ""
                    }`}
                    onClick={handleSaveClick}
                >
                    <i className="fa fa-bookmark"></i>{" "}
                </button>
            </div>
        </div>
    );
}

Cards.propTypes = {
    id: PropTypes.number.isRequired,
    img: PropTypes.string,
    subimg: PropTypes.string,
    title: PropTypes.string,
    owner: PropTypes.string,
    deadline: PropTypes.number,
    isSaved: PropTypes.bool,
    onSaveToggle: PropTypes.func,
};

export default Cards;
