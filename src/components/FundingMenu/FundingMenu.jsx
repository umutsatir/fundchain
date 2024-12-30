import { useState } from "react";
import styles from "./FundingMenu.module.css";
import PropTypes from "prop-types";
import { useAccount, useWriteContract } from "wagmi";
import { abi } from "../../../contracts/abi/abi";
import { parseEther } from "viem";

function FundingMenu(props) {
    const [amount, setAmount] = useState(0);
    const { isConnected } = useAccount();
    const { writeContract } = useWriteContract();

    const handleAmount = (e) => {
        setAmount(e.target.value);
    };

    const handleCancelButton = (e) => {
        e.preventDefault();
        props.setIsVisible(false);
    };

    function handleFundProject(e) {
        e.preventDefault();
        fundProject(e.target.amount.value);
    }

    function fundProject(value) {
        writeContract({
            abi,
            address: props.contractAddress,
            functionName: "fundProject",
            value: parseEther(value),
        });
    }

    if (!props.isVisible) return null;

    return (
        <div className={styles.FundingMenuContainer}>
            <div className={styles.FundingMenuContent}>
                <div className={styles.knowledgeSection}>
                    <div className={styles.knowledge}>
                        <h3 className={styles.projectTitle}>{props.title}</h3>
                        <p className={styles.projectDescription}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Accusamus quisquam in consequatur unde iste
                            harum nesciunt corporis deleniti. Iste, accusantium?
                        </p>
                        <p className={styles.projectBackers}>
                            {props.backers} backers
                        </p>
                    </div>

                    <img
                        className={styles.picture}
                        src={props.photo}
                        alt="SubPhoto"
                    />
                </div>

                <form onSubmit={(e) => handleFundProject(e)}>
                    <div className={styles.fundingSection}>
                        <div>
                            <label className={styles.label1}>Amount</label>
                            <br />
                            <label className={styles.label2}>ETH</label>
                            <input
                                name="amount"
                                type="number"
                                step={0.000000000000000001}
                                onChange={handleAmount}
                                required
                            />
                        </div>

                        <button
                            className={styles.cancelButton}
                            onClick={handleCancelButton}
                        >
                            Cancel
                        </button>
                        <button type="submit" className={styles.fundingButton}>
                            Fund {amount} ETH
                        </button>
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
