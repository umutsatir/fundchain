import React, { useState } from "react";
import "./RisksAndChallenges.css";

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
    <div className="risk-challenge">
      <div className="risk-title">
        <h1>Risks and challenges</h1>
        <p>
          Be honest about the potential risks and challenges of this project and
          how you plan to overcome them to complete it.
        </p>
      </div>

      <div className="risk-content">
        <textarea
          value={riskText} 
          onChange={handleTextChange} 
          onFocus={handleFocus}
          onBlur={handleBlur} 
        />
      </div>
    </div>
  );
};

export default RisksAndChallenges;
