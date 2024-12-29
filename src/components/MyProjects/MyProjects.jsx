import { useEffect, useState } from "react";
import styles from "./MyProjects.module.css";
import PropTypes from "prop-types";

function MyProjects(props) {
    const [isExpired, setIsExpired] = useState(false);
    const [deadlineInfo, setDeadlineInfo] = useState("");

    const getDeadline = (dbDate) => {
        const currentDate = new Date();
        const targetDate = new Date(dbDate);
        const diffInMs = targetDate - currentDate;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if(diffInDays > 0) {
            setIsExpired(false);
            setDeadlineInfo(`${diffInDays} days left`);
        }
        else {
            setIsExpired(true);
            setDeadlineInfo("expired");
        }
    }

    useEffect(() => {
        getDeadline(props.deadline);
    }, [props.deadline]);

    return(
        <div className={styles.knowledgeSection}>
            
            <img
                className={styles.picture}
                src={props.photo}
                alt="SubPhoto"
            />

            <div className={styles.knowledge}>
                <h3 className={styles.projectTitle}>{props.title}</h3>
                <p className={styles.projectDescription}>{props.description}</p>
                
                <div className={styles.projectAbout}>
                    <p className={styles.projectBackers}>{props.backers} backers</p>
                    <p className={isExpired ? styles.projectExpiredDeadline : styles.projectDeadline}>{deadlineInfo}</p>
                </div>
            </div>

            <form>
                <button
                    type="submit"
                    className={styles.button}
                    disabled={!isExpired}
                >
                    {props.buttonName}</button>
            </form>
            
        </div>
    );
}

MyProjects.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    backers: PropTypes.number,
    photo: PropTypes.string,
    buttonName: PropTypes.string,
    deadline: PropTypes.string,
    buttonFunction: PropTypes.func,
}

export default MyProjects;

