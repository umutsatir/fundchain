import React, { useState } from "react";
import styles from "./PlanItem.module.css";

const Plan = () => {
  // Milestone'ları state olarak saklayalım
  const [milestones, setMilestones] = useState([
    { id: 1, name: "Idea", completed: false },
    { id: 2, name: "Proof of Concept", completed: false },
    { id: 3, name: "Working Prototype", completed: false },
    { id: 4, name: "Pre-production", completed: false },
    { id: 5, name: "Production", completed: false },
  ]);

  const [description, setDescription] = useState("");

  const handleCheckboxChange = (id) => {
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone) =>
        milestone.id === id
          ? { ...milestone, completed: !milestone.completed }
          : milestone
      )
    );
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className={styles["plan-container"]}>
      <div className={styles["milestones"]}>
        {milestones.map((milestone) => (
          <div key={milestone.id} className={styles["milestone"]}>
            <input type="checkbox"checked={milestone.completed} onChange={() => handleCheckboxChange(milestone.id)}
            />
            {milestone.name}
          </div>
        ))}
      </div>

      <div className={styles["description-block"]}>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Add your plan description here..."
        />
      </div>
    </div>
  );
};

export default Plan;
