import React, { useEffect, useState } from "react";
import styles from "./FundingCalculator.module.css";

function FundingCalculator({ onClose, onSelect }) {
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [estimatedBudget, setEstimatedBudget] = useState("");
    const [taxRate, setTaxRate] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [fundchainFee, setFundchainFee] = useState(0);
    const [processingFee, setProcessingFee] = useState(0);
    const [suggestedGoal, setSuggestedGoal] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const calculateFees = (budget, rate) => {
        const taxes = budget * (rate / 100);
        const fundchain = budget * 0.05;
        const processing = budget * 0.05;
        const total = budget + taxes + fundchain + processing;

        setTaxAmount(taxes);
        setFundchainFee(fundchain);
        setProcessingFee(processing);
        setSuggestedGoal(total);
        setIsActive(budget > 0);
    };

    const handleSelect = () => {
        onSelect(suggestedGoal, currency);
    };

    const handleAmountChange = (e) => {
        const inputValue = e.target.value;
        const sanitizedValue = inputValue.replace(/[^0-9.]/g, "");
        setAmount(sanitizedValue);
        const budget = parseFloat(sanitizedValue) || 0;
        setEstimatedBudget(budget);
        if (budget > 0) {
            calculateFees(budget, taxRate);
            setIsActive(true);
        } else {
            resetCalculations();
            setIsActive(false);
        }
    };

    const resetCalculations = () => {
        setTaxRate(0);
        setFundchainFee(0);
        setProcessingFee(0);
        setSuggestedGoal(0);
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (e.target.classList.contains(styles.modalOverlay)) {
                onClose();
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [onClose]);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    X
                </button>
                <h2>Funding Calculator</h2>
                <p>
                    Enter the estimated amount you think you will need to make
                    this project. Do not forget that building out a budget that
                    includes shipping, materials, research, vendors, and labor
                    costs.
                </p>

                <div className={styles.currencyInputContainer}>
                    <label htmlFor="estimatedAmount">Estimated Amount</label>
                    <input
                        id="estimatedAmount"
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        onInput={(e) =>
                            (e.target.value = e.target.value.replace(
                                /[^0-9.]/g,
                                ""
                            ))
                        }
                        placeholder="e.g., 10000"
                        className={styles.currencyInput}
                    />
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className={styles.currencySelector}
                    >
                        <option value="USD">$ USD</option>
                        <option value="EUR">€ EUR</option>
                        <option value="GBP">£ GBP</option>
                        <option value="TRY">₺ TRY</option>
                    </select>
                </div>

                <div className={styles.taxRateContainer}>
                    <div className={styles.taxRateTitle}>
                        <label>Tax Rate (%):</label>
                        <input
                            className={styles.taxRateInput}
                            type="number"
                            value={taxRate}
                            onChange={(e) => {
                                let value = parseFloat(e.target.value);
                                if (value < 0) value = 0;
                                if (value > 40) value = 40;
                                setTaxRate(value || 0);
                                calculateFees(estimatedBudget, value || 0);
                            }}
                            min="0"
                            max="40"
                            disabled={!isActive}
                        />
                    </div>
                    <p
                        className={styles.taxAmount}
                        style={{ color: isActive ? "black" : "gray" }}
                    >
                        {currency} {taxAmount.toFixed(2)}
                    </p>
                </div>

                <div className={styles.feesContainer}>
                    <div
                        className={styles.feeTitle}
                        style={{ color: isActive ? "black" : "gray" }}
                    >
                        <p>Fundchain Fee (5%):</p>
                        <p>Processing Fee (5%):</p>
                        <p>Suggested Goal:</p>
                    </div>
                    <div
                        className={styles.feeAmount}
                        style={{ color: isActive ? "black" : "gray" }}
                    >
                        <p>
                            {currency} {fundchainFee.toFixed(2)}
                        </p>
                        <p>
                            {currency} {processingFee.toFixed(2)}
                        </p>
                        <p>
                            {currency} {suggestedGoal.toFixed(2)}
                        </p>
                    </div>
                </div>

                <button
                    className={styles.button}
                    onClick={() => {
                        handleSelect();
                        onClose();
                    }}
                    disabled={!isActive}
                >
                    Use Suggested Goal
                </button>
            </div>
        </div>
    );
}

export default FundingCalculator;
