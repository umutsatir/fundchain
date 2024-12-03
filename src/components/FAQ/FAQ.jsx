import React from "react";
import styles from "./FAQ.module.css";
import FAQItem from "../FAQItem/FAQItem"; 

const FAQ = () => {
  return (
    <div className={styles["faq-container"]}>
      <div className={styles["faq-wrapper"]}>
        <div className={styles["faq-title"]}>
          <h2>Frequently Asked Questions</h2>
          <p>Post answers to frequently asked questions</p>
        </div>

        <div className={styles["faq-content"]}>
          <FAQItem />
        </div>
      </div>
    </div>
  );
};

export default FAQ;
