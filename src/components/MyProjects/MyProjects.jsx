import { useEffect, useState } from "react";
import styles from "./MyProjects.module.css";
import PropTypes from "prop-types";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { config } from "../../config";
import { abi } from "../../../contracts/abi/abi";

function MyProjects(props) {
    const [deadlineInfo, setDeadlineInfo] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [backers, setBackers] = useState(0);
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
        const fetchBackers = async () => {
            getDeadline(props.deadline);
            setBackers(parseInt(await props.getBackers(props.contractAddress)));
        };
        fetchBackers();
    }, []);

    async function handleWithdraw() {
        if (props.status == -1)
            props.handleNotification("This project is banned", "error");
        if (!isConnected)
            props.handleNotification(
                "Please connect your wallet first",
                "info"
            );
        else {
            setIsPending(true);
            try {
                const result = await writeContract(config, {
                    abi,
                    address: props.contractAddress,
                    functionName: "withdraw",
                });
                const tx = await waitForTransactionReceipt(config, {
                    hash: result,
                });

                if (tx.status == "success") {
                    props.handleNotification(
                        "Withdrawal successful. Please check your wallet account.",
                        "success"
                    );
                } else {
                    props.handleNotification(
                        "Withdrawal failed. Please try again.",
                        "error"
                    );
                }
            } catch (error) {
                if (
                    error.message.split("\n")[0] == "User rejected the request."
                ) {
                    props.handleNotification("Transaction rejected", "warning");
                } else {
                    props.handleNotification(
                        error.message.split("\n")[1],
                        "error"
                    );
                    console.log(error.message);
                }
            }
            setIsPending(false);
        }
    }

    return (
        <div className={styles.knowledgeSection}>
            <img className={styles.picture} src={props.image} alt="SubPhoto" />

            <div className={styles.knowledge}>
                <h3 className={styles.projectTitle}>{props.title}</h3>
                <p className={styles.projectDescription}>{props.description}</p>

                <div className={styles.projectAbout}>
                    <p className={styles.projectBackers}>{backers} backers</p>
                    <p
                        className={
                            deadlineInfo !== "expired"
                                ? styles.projectExpiredDeadline
                                : styles.projectDeadline
                        }
                    >
                        {deadlineInfo}
                    </p>
                    {props.status == -1 && (
                        <p className={styles.projectExpiredDeadline}>Banned</p>
                    )}
                </div>
            </div>
            <button
                onClick={handleWithdraw}
                className={styles.button}
                disabled={
                    deadlineInfo !== "Expired" ||
                    isPending ||
                    props.status == -1
                }
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
