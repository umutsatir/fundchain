import React from 'react';
import styles from '../styles/Create.module.css';
import CreateTab from '../components/CreateTab/CreateTab';

const Create = () => {
    return (
        <div className={styles.tabContainer}>
            <CreateTab />
        </div>
    );
};

export default Create;
