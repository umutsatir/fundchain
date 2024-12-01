import React, { useState } from "react";
import "./FAQItem.css";

const FAQItem = () => {
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");

  const handleQuestionChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleAnswerChange = (e) => {
    setAnswerText(e.target.value);
  };

  return (
    <div className="faq-container">
      <h5>Question</h5>
      <input
      type="text"
        value={questionText}
        onChange={handleQuestionChange}
      />

      <h5>Answer</h5>
      <textarea
        value={answerText}
        onChange={handleAnswerChange}
      />

      <button className="delete-button">Delete</button>
    </div>
  );
};

export default FAQItem;
