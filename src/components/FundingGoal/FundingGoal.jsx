import React, { useState, useEffect } from "react";
import styles from "./FundingGoal.module.css";
import FundingCalculator from "../FundingCalculator/FundingCalculator";

const categoryLimits = {
    tech: 1000000,
    art: 500000,
    education: 300000,
    health: 200000,
};

const exchangeRates = {
    USD: 1, // USD remains at its own value
    EUR: 0.93, // 1 USD = 0.93 EUR (example rate)
    GBP: 0.82, // 1 USD = 0.82 GBP (example rate)
    TRY: 27.5, // 1 USD = 27.5 TRY (example rate)
};

const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(number);
};

function FundingGoal({ updateFunding, formData }) {
    const [etherPrice, setEtherPrice] = useState(4000);
    const [amount, setAmount] = useState(formData.amount * etherPrice || "");
    const [currency, setCurrency] = useState(formData.currency || "USD");
    const [warning, setWarning] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [etherValue, setEtherValue] = useState(0);

    const maxAmount = 1000000;
    const convertedAmount =
        parseFloat(amount) / (exchangeRates[currency] || 1) || 0;

    useEffect(() => {
        if (currency === "EUR") {
            setEtherPrice(3900);
        } else if (currency === "GBP") {
            setEtherPrice(3100);
        } else if (currency === "TRY") {
            setEtherPrice(130000);
        }
        // Update funding whenever amount or currency changes
        setEtherValue(
            amount ? (parseFloat(amount) / etherPrice).toFixed(2) : 0
        );
        updateFunding("currency", currency);
        updateFunding("amount", etherValue);

        // Check if the entered amount exceeds the maximum allowed amount
        if (convertedAmount > maxAmount) {
            setWarning(true);
        } else {
            setWarning(false);
        }
    }, [amount, currency, convertedAmount, etherPrice, etherValue]);

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setAmount(value);
        }
    };

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
    };

    const handleSelect = (goal, currencyIn) => {
        setAmount(goal);
        setCurrency(currencyIn);
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <div className={styles.description}>
                    <h2>Funding Goal</h2>
                    <p>
                        Set an achievable goal that covers what you need to
                        complete your project.
                    </p>
                    <p>
                        Funding is all-or-nothing. If you don’t meet your goal,
                        you won’t receive any money.
                    </p>
                </div>
                <form
                    className={styles.form}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className={styles.currencyInputContainer}>
                        <input
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="Amount"
                            className={`${styles.currencyInput} ${
                                warning ? styles.invalidInput : ""
                            }`}
                        />
                        <select
                            value={currency}
                            onChange={handleCurrencyChange}
                            className={styles.currencySelector}
                        >
                            <option value="USD">$ USD</option>
                            <option value="EUR">€ EUR</option>
                            <option value="GBP">£ GBP</option>
                            <option value="TRY">₺ TRY</option>
                        </select>
                    </div>

                    <div className={styles.convertedAmount}>
                        <p>
                            Converted Amount: {formatNumber(convertedAmount)} $
                            = {formatNumber(etherValue)} ETH
                        </p>
                    </div>

                    {warning && (
                        <div className={styles.warning}>
                            <p>
                                Warning: The maximum allowed amount is{" "}
                                {formatNumber(maxAmount)} $.
                            </p>
                        </div>
                    )}

                    <div className={isModalOpen ? styles.blurBackground : ""}>
                        <p>
                            <span
                                className={styles.underlineText}
                                onClick={openModal}
                            >
                                Use the funding calculator&nbsp;
                            </span>
                            to calculate the amount you need.
                        </p>

                        {isModalOpen && (
                            <FundingCalculator
                                onClose={closeModal}
                                onSelect={handleSelect}
                            ></FundingCalculator>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FundingGoal;
