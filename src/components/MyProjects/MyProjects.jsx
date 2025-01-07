import { useEffect, useState } from "react";
import styles from "./MyProjects.module.css";
import PropTypes from "prop-types";
import { useAccount } from "wagmi";
import { writeContract } from "@wagmi/core";
import { config } from "../../config";
import { abi } from "../../../contracts/abi/abi";

function MyProjects(props) {
    const [deadlineInfo, setDeadlineInfo] = useState("");
    const { isConnected } = useAccount();

    const getDeadline = (dbDate) => {
        if (!dbDate) return;
        const currentDate = new Date();
        const [year, month, day] = dbDate.split("-");
        const targetDate = new Date(year, month - 1, day);
        const diffInMs = targetDate.getTime() - currentDate.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays > 0) {
            setDeadlineInfo(`${diffInDays} days left`);
        } else {
            setDeadlineInfo("expired");
        }
    };

    useEffect(() => {
        getDeadline(props.deadline);
    }, []);

    async function handleWithdraw() {
        if (!isConnected)
            props.handleNotification(
                "Please connect your wallet first",
                "info"
            );
        else {
            try {
                await writeContract(config, {
                    abi,
                    address: props.contractAddress,
                    functionName: "withdraw",
                });
                props.handleNotification(
                    "Withdrawal successful. Please check your wallet account.",
                    "success"
                );
            } catch (error) {
                console.log(error);
                props.handleNotification(
                    "An error occurred. Please check your wallet account. It should be the same as you created the project.",
                    "error"
                );
            }
        }
    }

    return (
        <div className={styles.knowledgeSection}>
            <img className={styles.picture} src={props.image} alt="SubPhoto" />

            <div className={styles.knowledge}>
                <h3 className={styles.projectTitle}>{props.title}</h3>
                <p className={styles.projectDescription}>{props.description}</p>

                <div className={styles.projectAbout}>
                    <p className={styles.projectBackers}>x backers</p>
                    <p
                        className={
                            deadlineInfo !== "expired"
                                ? styles.projectExpiredDeadline
                                : styles.projectDeadline
                        }
                    >
                        {deadlineInfo}
                    </p>
                </div>
            </div>
            <button
                onClick={handleWithdraw}
                className={styles.button}
                disabled={deadlineInfo !== "expired"}
            >
                {props.buttonName}
            </button>
        </div>
    );
}

MyProjects.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    deadline: PropTypes.string,
    buttonName: PropTypes.string,
    buttonFunction: PropTypes.func,
};

export default MyProjects;
