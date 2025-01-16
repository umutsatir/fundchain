import { useState } from "react";
import styles from "./FundingMenu.module.css";
import PropTypes from "prop-types";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { abi } from "../../../contracts/abi/abi";
import { config } from "../../config";
import { parseEther } from "viem";
import $ from "jquery";
import { Cookies } from "react-cookie";
import { apiUrl } from "../../api_url";

function FundingMenu(props) {
    const [amount, setAmount] = useState(0.0);
    const [isPending, setIsPending] = useState(false);
    const account = useAccount();
    const cookies = new Cookies();

    const handleAmount = (e) => {
        setAmount(e.target.value);
    };

    const handleCancelButton = (e) => {
        e.preventDefault();
        props.setIsVisible(false);
    };

    async function handleFundProject(e) {
        e.preventDefault();
        await fundProject(e.target.amount.value);
    }

    async function addDonator() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: apiUrl + "/addDonator.php",
                type: "POST",
                data: {
                    projectId: props.id,
                    username: cookies.get("username"),
                    publicKey: account.address,
                },
                success: function (data) {
                    try {
                        data = JSON.parse(data);
                        if (data.status) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    } catch (error) {
                        reject("Failed to parse response");
                    }
                },
                error: function (error) {
                    console.log(error);
                    reject(error);
                },
            });
        });
    }

    async function fundProject(value) {
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
                functionName: "fundProject",
                value: parseEther(value),
            });
            props.handleNotification(
                "Wait for transaction to be completed",
                "info"
            );
            const tx = await waitForTransactionReceipt(config, {
                hash: result,
            });
            if (tx.status == "success") {
                const result = await addDonator();
                if (result) {
                    props.handleNotification("Funding successful", "success");
                } else {
                    props.handleNotification("Funding failed", "error");
                }
            } else {
                props.handleNotification("Funding failed", "error");
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

    if (!props.isVisible) return null;

    return (
        <div className={styles.FundingMenuContainer}>
            <div className={styles.FundingMenuContent}>
                <div className={styles.knowledgeSection}>
                    <div className={styles.knowledge}>
                        <h3 className={styles.projectTitle}>{props.title}</h3>
                        <p className={styles.projectDescription}>
                            {props.description}
                        </p>
                        <p className={styles.projectBackers}>
                            {props.backers} backers
                        </p>
                    </div>
                </div>

                <form onSubmit={(e) => handleFundProject(e)}>
                    <div className={styles.fundingSection}>
                        <div className={styles.entry}>
                            <label className={styles.label2}>ETH</label>
                            <input
                                name="amount"
                                type="number"
                                step={0.000000000000000001}
                                onChange={handleAmount}
                                required
                            />
                        </div>

                        <div className={styles.buttons}>
                            <button
                                className={styles.cancelButton}
                                onClick={handleCancelButton}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={styles.fundingButton}
                                disabled={isPending}
                            >
                                Fund {amount} ETH
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

FundingMenu.propTypes = {
    title: PropTypes.string,
    backers: PropTypes.number,
    photo: PropTypes.string,
    isVisible: PropTypes.bool,
    setIsVisible: PropTypes.func,
};

export default FundingMenu;
