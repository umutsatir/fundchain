import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Cards.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import $ from "jquery";
import { Cookies } from "react-cookie";
import { apiUrl } from "../../api_url";

function Cards(props) {
    const cookies = new Cookies();
    const [isSaved, setIsSaved] = useState(props.isSaved);

    useEffect(() => {
        $.ajax({
            url: apiUrl + "/checkSave.php",
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
    }, [props.isSaved]);

    const handleSaveClick = () => {
        if (
            cookies.get("loggedIn") == false ||
            cookies.get("loggedIn") == null
        ) {
            window.location.href = "/login";
            return;
        }

        setSavedProject();
    };

    const setSavedProject = () => {
        $.ajax({
            url: apiUrl + "/save.php",
            type: "POST",
            data: {
                projectId: props.id,
                username: cookies.get("username"),
                willBeSaved: !isSaved,
            },
            success: function (data) {
                data = JSON.parse(data);
                if (data.status) {
                    props.onSaveToggle(props.id);
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

    const getImageSrc = () => {
        if (Array.isArray(props.img) && props.img.length > 0) {
            return props.img[0];
        }
        return props.img;
    };

    return (
        <div className={styles.card}>
            <img className={styles.cardImage} src={getImageSrc()} alt="Photo" />
            <div className={styles.cardHeader}>
                <img
                    className={styles.cardSubimage}
                    src={props.subimg}
                    alt="SubPhoto"
                />
                <div className={styles.cardProperties}>
                    <h2
                        className={styles.cardTitle}
                        onClick={(e) => handlePage(e)}
                        title={props.title}
                    >
                        {props.title.split(" ")[0].length > 12
                            ? `${props.title.substring(0, 12)}...`
                            : props.title}
                    </h2>
                    <p className={styles.cardOwner}>{props.owner}</p>
                    <p className={styles.cardDeadline}>
                        <i className="fa fa-clock"></i> {/* time symbol */}
                        {props.deadline <= 0
                            ? "0 days left"
                            : `${props.deadline} days left`}
                    </p>
                </div>
                {/* save button */}
                <button
                    className={`${styles.cardSavedButton} ${
                        isSaved ? styles.saved : ""
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
    img: PropTypes.array,
    subimg: PropTypes.string,
    title: PropTypes.string,
    owner: PropTypes.string,
    deadline: PropTypes.number,
    isSaved: PropTypes.bool,
    onSaveToggle: PropTypes.func,
};

export default Cards;
