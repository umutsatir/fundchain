import { useState, useEffect } from "react";
import styles from "./Funding.module.css";
import { Cookies } from "react-cookie";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../api_url";
import FundingMenu from "../FundingMenu/FundingMenu";
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";
import { formatEther } from "viem";
import { abi } from "../../../contracts/abi/abi";
import { config } from "../../config";

import photop from "/public/profilePicture.png"; //temporarily added.

const Funding = (props) => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);
    const [loggedIn, setLoggedIn] = useState(cookies.get("loggedIn"));
    const [backProject, setBackProject] = useState(false);
    const [progress, setProgress] = useState(0);
    const [ETHValue, setETHValue] = useState({
        pledged: 0,
        goal: 0,
    });
    const [data, setData] = useState({
        pledged: 0,
        goal: 0,
        backers: 0,
        daysLeft: 0,
    });
    const { isConnected } = useAccount();
    const etherPrice = 4000;

    async function readFromContract(functionName) {
        return await readContract(config, {
            abi,
            address: props.contractAddress,
            functionName: functionName,
        });
    }

    function convertEtherToUSD(ether) {
        return (ether * etherPrice).toFixed(1);
        // const api =
        //     "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
        // $.ajax({
        //     url: api,
        //     type: "GET",
        //     headers: {
        //         x_cg_demo_api_key: "CG-Y7X3sef8d5QgDUxGwoiQ9FYr",
        //         "Access-Control-Allow-Origin": "*",
        //         "Content-Type": "application/json",
        //     },
        //     success: function (data) {
        //         return data.ethereum.usd * ether;
        //     },
        //     error: function (error) {
        //         console.log(error);
        //         return 0;
        //     },
        // });
    }

    function convertUSDToEther(usd) {
        return usd * etherPrice;
    }

    useEffect(() => {
        if (!cookies.get("loggedIn")) return;
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
        const fetchData = async () => {
            try {
                if (!props.contractAddress) return;
                const pledgedData = convertEtherToUSD(
                    formatEther(await readFromContract("getTotalBalance"))
                );
                const goalData = convertEtherToUSD(
                    formatEther(await readFromContract("getGoal"))
                );
                const backersData = parseInt(
                    await readFromContract("getDonatorCount")
                );
                const daysLeftData = parseInt(
                    await readFromContract("getDeadline")
                );
                setETHValue({
                    pledged: pledgedData / etherPrice,
                    goal: goalData / etherPrice,
                });
                setData({
                    pledged: pledgedData,
                    goal: goalData,
                    backers: backersData,
                    daysLeft: daysLeftData,
                });
            } catch (error) {
                console.log("Contract data fetch failed\n", error);
            }
        };
        fetchData();
    }, [props]);

    useEffect(() => {
        setProgress((data.pledged / data.goal) * 100);
    }, [data]);

    const setSavedProject = () => {
        if (!cookies.get("loggedIn")) navigate("/login");
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
                    setIsSaved(!isSaved);
                } else {
                    props.handleNotification(data.message, "error");
                }
            },
            error: function (error) {
                props.handleNotification("Failed to save project", "error");
            },
        });
    };

    const handleBackButton = () => {
        if (!loggedIn) props.handleNotification("Please login first", "info");
        else if (!isConnected)
            props.handleNotification(
                "Please connect your wallet first",
                "info"
            );
        else setBackProject(!backProject);
    };

    return (
        <div className={styles.progressContainer}>
            {backProject && (
                <FundingMenu
                    title={props.title}
                    backers={data.backers}
                    photo={photop}
                    isVisible={backProject}
                    setIsVisible={setBackProject}
                    handleNotification={props.handleNotification}
                    contractAddress={props.contractAddress}
                />
            )}
            <div className={styles.progressBackground}>
                <div
                    className={styles.progressBar}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className={styles.progressInfo}>
                <h1>
                    {data.pledged}$ / {ETHValue.pledged} ETH
                </h1>
                <p>
                    pledged of {data.goal}$ / {ETHValue.goal} ETH goal
                </p>
                <h1>{data.backers}</h1>
                <p>backers</p>
                <h1>{data.daysLeft}</h1>
                <p>days to go</p>
            </div>
            <div className={styles.buttons}>
                <button
                    className={styles.backButton}
                    onClick={handleBackButton}
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
