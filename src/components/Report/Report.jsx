import React, { useState } from "react";
import styles from "./Report.module.css";

const Report = () => {
  const [reportReason, setReportReason] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reportReason.trim() === "") {
      setFeedback("Please provide a reason for the report.");
      return;
    }

    // Simulated API call
    setTimeout(() => {
      setFeedback("Report successfully submitted. Thank you.");
      setReportReason("");
      setAdditionalDetails("");
    }, 1000);
  };

  return (
    <div className={styles.reportContainer}>
      <h3 className={styles.heading}>Report</h3>
      <p className={styles.paragraph}>
        If you think that this project is a scam, you can report it below.
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
        >
          <option value="">Select a reason</option>
          <option value="Misleading Information">Misleading Information</option>
          <option value="Fraud">Fraud</option>
          <option value="Spam">Spam</option>
          <option value="Other Reasons">Other Reasons</option>
        </select>

        <label className={styles.reportLabel} htmlFor="additionalDetails">
          Details
        </label>
        <textarea
          id="additionalDetails"
          value={additionalDetails}
          onChange={(e) => setAdditionalDetails(e.target.value)}
          placeholder="Provide additional details here..."
          className={styles.reportText}
        />

        <button type="submit" className={styles.reportButton}>
          Report
        </button>
      </form>
    </div>
  );
};

export default Report;
