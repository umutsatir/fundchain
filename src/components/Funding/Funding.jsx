import { useState, useEffect } from "react";
import styles from "./Funding.module.css";
import { Cookies } from "react-cookie";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { useReadContract, useAccount, useWriteContract } from "wagmi";
import { abi } from "../../../contracts/abi/abi";
import { parseEther } from "viem";

const Funding = (props) => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);
    const [progress, setProgress] = useState(0);
    const pledged = readFromContract("getTotalBalance");
    const goal = readFromContract("getFundedAmount");
    const backers = readFromContract("getBackers");
    const daysLeft = readFromContract("getDeadline");
    const { isConnected } = useAccount();
    const { writeContract } = useWriteContract();

    function readFromContract(functionName) {
        useReadContract({
            abi,
            address: props.contractAddress,
            functionName: functionName,
        });
    }

    useEffect(() => {
        setProgress((pledged / goal) * 100);
    }, [pledged, goal]);

    useEffect(() => {
        if (!cookies.get("loggedIn")) return;
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
    }, [props]);

    const setSavedProject = () => {
        if (!cookies.get("loggedIn")) navigate("/login");
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

    function handleBackProjectButton() {
        if (!isConnected)
            console.log("Please connect your wallet"); // todo add popup message
        else {
            // todo add menu for typing the amount
            fundProject(1);
        }
    }

    function fundProject(value) {
        writeContract({
            abi,
            address: props.contractAddress,
            functionName: "fundProject",
            value: parseEther(value),
        });
    }

    return (
        <div className={styles.progressContainer}>
            <div className={styles.progressBackground}>
                <div
                    className={styles.progressBar}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className={styles.progressInfo}>
                <h1>{pledged}$</h1>
                <p>pledged of {goal}$ goal</p>
                <h1>{backers}</h1>
                <p>backers</p>
                <h1>{daysLeft}</h1>
                <p>days to go</p>
            </div>
            <div className={styles.buttons}>
                <button
                    className={styles.backButton}
                    onClick={handleBackProjectButton}
                >
                    Back this project
                </button>
                <button className={styles.shareButton}>Share</button>
                <button
                    className={`${styles.remindButton} ${
                        isSaved ? styles.saved : ""
                    }`}
                    onClick={setSavedProject}
                >
                    <i className="fa fa-bookmark"></i> Remind me
                </button>
            </div>
        </div>
    );
};

export default Funding;
