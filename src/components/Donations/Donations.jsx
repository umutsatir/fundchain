import { useEffect, useState } from "react";
import styles from "./Donations.module.css";
import PropTypes from "prop-types";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { abi } from "../../../contracts/abi/abi";
import { config } from "../../config";
import $ from "jquery";
import { Cookies } from "react-cookie";
import { apiUrl } from "../../api_url";

function Donations(props) {
    const [deadlineInfo, setDeadlineInfo] = useState("");
    const [isPending, setIsPending] = useState(false);
    const account = useAccount();
    const cookies = new Cookies();

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
    }, [props.deadline]);

    function removeDonation() {
        console.log(props.id, cookies.get("username"));
        $.ajax({
            url: apiUrl + "/removeDonation.php",
            type: "POST",
            data: {
                projectId: props.id,
                username: cookies.get("username"),
            },
            success: function (data) {
                console.log(data);
                data = JSON.parse(data);
                if (data.status) {
                    props.setOnChange(props.id);
                }
            },
            error: function (error) {
                console.log(error);
            },
        });
    }

    async function handleWithdraw() {
        if (isPending) {
            return;
        }
        if (!account.isConnected) {
            props.handleNotification(
                "Please connect your wallet first",
                "info"
            );
            return;
        }
        setIsPending(true);

        try {
            const result = await writeContract(config, {
                abi,
                address: props.contractAddress,
                functionName: "withdrawDonate",
            });
            props.handleNotification(
                "Wait for transaction to be completed",
                "info"
            );
            const tx = await waitForTransactionReceipt(config, {
                hash: result,
            });
            if (tx.status == "success") {
                removeDonation();
                props.handleNotification("Withdraw successful", "success");
            } else {
                props.handleNotification("Withdraw failed", "error");
            }
        } catch (error) {
            if (error.message.split("\n")[0] == "User rejected the request.") {
                props.handleNotification("Transaction rejected", "warning");
            } else {
                props.handleNotification(error.message.split("\n")[1], "error");
                console.log(error.message);
            }
        }
        setIsPending(false);
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

            <button
                onClick={handleWithdraw}
                className={styles.button}
                disabled={isPending}
            >
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
