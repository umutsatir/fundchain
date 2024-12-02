import React from 'react';
import styles from '../styles/Create.module.css';
import Basics from '../components/Basics/basics';
import FundingGoal from '../components/FundingGoal/FundingGoal';

const Create = () => {
    return (
        <div>
            <FundingGoal category={"art"}/>
            <Basics />
        </div>
    );
};

export default Create;
