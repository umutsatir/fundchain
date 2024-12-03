import React, { useState } from "react";
import styles from "./RisksAndChallenges.module.css";

const RisksAndChallenges = () => {
  const defaultText = "Please add your text here...";

  const [riskText, setRiskText] = useState(defaultText);

  const handleTextChange = (e) => {
    setRiskText(e.target.value);
  };

  const handleFocus = () => {
    if (riskText === defaultText) {
      setRiskText("");
    }
  };

  const handleBlur = () => {
    if (riskText === "") {
      setRiskText(defaultText);
    }
  };

  return (
    <div className={styles["risk-challenge-container"]}>
      <div className={styles["risk-challenge-wrapper"]}>
        <div className={styles["risk-title"]}>
          <h2>Risks and Challenges</h2>
          <p>
            Be honest about the potential risks and challenges of this project
            and how you plan to overcome them to complete it.
          </p>
        </div>

        <div className={styles["risk-content"]}>
          <textarea
            value={riskText}
            onChange={handleTextChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </div>
    </div>
  );
};

export default RisksAndChallenges;
