import { useEffect, useState } from "react";
import styles from "./Donations.module.css";
import PropTypes from "prop-types";
import { useWriteContract, useAccount } from "wagmi";

function Donations(props) {
    const [deadlineInfo, setDeadlineInfo] = useState("");
    const { isConnected } = useAccount();
    const { writeContract } = useWriteContract();

    const getDeadline = (dbDate) => {
        const currentDate = new Date();
        const targetDate = new Date(dbDate);
        const diffInMs = targetDate - currentDate;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays > 0) {
            setDeadlineInfo(`${diffInDays} days left`);
        } else {
            setDeadlineInfo("expired");
        }
    };

    useEffect(() => {
        getDeadline(props.deadline);
    }, [props.deadline]);

    function handleWithdraw() {
        if (!isConnected)
            props.handleNotification(
                "Please connect your wallet first",
                "info"
            );
        else {
            writeContract({
                abi,
                address: props.contractAddress,
                functionName: "withdrawDonate",
            });
        }
    }

    return (
        <div className={styles.knowledgeSection}>
            <img className={styles.picture} src={props.image} alt="SubPhoto" />

            <div className={styles.knowledge}>
                <h3 className={styles.projectTitle}>{props.title}</h3>
                <p className={styles.projectDescription}>{props.description}</p>

                <div className={styles.projectAbout}>
                    <p className={styles.projectBackers}>
                        {props.backers} backers
                    </p>
                    <p
                        className={
                            deadlineInfo === "expired"
                                ? styles.projectExpiredDeadline
                                : styles.projectDeadline
                        }
                    >
                        {deadlineInfo}
                    </p>
                </div>
            </div>

            <button onClick={handleWithdraw} className={styles.button}>
                {props.buttonName}
            </button>
        </div>
    );
}

Donations.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    backers: PropTypes.number,
    photo: PropTypes.string,
    buttonName: PropTypes.string,
    deadline: PropTypes.string,
    buttonFunction: PropTypes.func,
};

export default Donations;
