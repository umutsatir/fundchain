import { useState } from 'react';
import './Funding.css';

const Funding = () => {
  const [pledged, setPledged] = useState(100000);
  const [goal, setGoal] = useState(300000);
  const [backers, setBackers] = useState(250);
  const [daysLeft, setDaysLeft] = useState(36);

  const progress = (pledged / goal) * 100;

  return (
    <div className="progress-container">
      <div className="progress-background">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="progress-info">
        <h1>{pledged.toLocaleString()}$</h1>
        <p>pledged of {goal.toLocaleString()}$ goal</p>
        <h1>{backers}</h1>
        <p>backers</p>
        <h1>{daysLeft}</h1>
        <p>days to go</p>
      </div>
      <button className="back-button">Back this project</button>
      <button className="share-button">Share</button>
      <button className="remind-button">
        <i className="fa fa-bookmark"></i>{" "}{}
        Remind me
      </button>
    </div>
  );
};

export default Funding;
