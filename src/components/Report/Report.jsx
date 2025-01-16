import React, { useEffect, useState } from "react";
import styles from "./Report.module.css";
import { Cookies } from "react-cookie";
import $ from "jquery";
import { apiUrl } from "../../api_url";

const Report = ({ id }) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [reportReason, setReportReason] = useState("");
    const [additionalDetails, setAdditionalDetails] = useState("");
    const [feedback, setFeedback] = useState(null);
    const cookies = new Cookies();

    useEffect(() => {
        if (!cookies.get("username")) return;
        $.ajax({
            url: apiUrl + "/checkReport.php",
            type: "POST",
            data: {
                projectId: id,
                username: cookies.get("username"),
            },
            success: function (data) {
                if (!data.status) setIsButtonDisabled(false);
            },
            error: function (error) {
                console.log(error);
            },
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isButtonDisabled) return;

        if (additionalDetails.length < 10) {
            setFeedback("Description must be at least 10 characters long");
            return;
        }

        $.ajax({
            url: apiUrl + "/createReport.php",
            type: "POST",
            data: {
                projectId: id,
                username: cookies.get("username"),
                reportType: reportReason,
                description: additionalDetails,
            },
            success: function (data) {
                if (data.status) {
                    setFeedback("Report submitted successfully");
                    setIsButtonDisabled(true);
                } else setFeedback(data.message);
            },
            error: function (error) {
                console.log(error);
                setFeedback("Failed to submit report");
            },
        });
    };

    return (
        <div className={styles.reportContainer}>
            <h3 className={styles.heading}>Report</h3>
            <p className={styles.paragraph}>
                If you think that this project is a scam, you can report it
                below.
            </p>
            {feedback && (
                <p
                    className={
                        feedback.includes("success")
                            ? styles.successFeedback
                            : styles.feedback
                    }
                >
                    {feedback}
                </p>
            )}
            <form onSubmit={handleSubmit} className={styles.reportForm}>
                <label className={styles.reportLabel} htmlFor="reportReason">
                    Reason
                </label>
                <select
                    id="reportReason"
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className={styles.selectBox}
                    required
                >
                    <option value="">Select a reason</option>
                    <option value="Misleading Information">
                        Misleading Information
                    </option>
                    <option value="Fraud">Fraud</option>
                    <option value="Spam">Spam</option>
                    <option value="Other Reasons">Other Reasons</option>
                </select>

                <label
                    className={styles.reportLabel}
                    htmlFor="additionalDetails"
                >
                    Details
                </label>
                <textarea
                    id="additionalDetails"
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    placeholder="Provide additional details here..."
                    className={styles.reportText}
                    required
                />
                <button
                    type="submit"
                    className={styles.reportButton}
                    disabled={isButtonDisabled}
                >
                    Report
                </button>
            </form>
        </div>
    );
};

export default Report;
