import { useState } from "react";
import styles from "./FundingMenu.module.css";
import PropTypes from "prop-types";

function FundingMenu(props) {
    const [amount, setAmount] = useState(0);
    const [isVisible, setIsVisible] = useState(true); // Controling the popup visibility

    const handleAmount = (e) => {
        setAmount(e.target.value);
    }

    const handleCancelButton = (e) => {
        e.preventDefault(); // Prevent the sending null form.
        setIsVisible(false);        
    }

    if(!isVisible) return null;

    return(
        <div className={styles.FundingMenuContainer}>
            <div className={styles.FundingMenuContent}>

                <div className={styles.knowledgeSection}>
                    <div className={styles.knowledge}>
                        <h3 className={styles.projectTitle}>{props.title}</h3>
                        <p className={styles.projectDescription}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus quisquam in consequatur unde iste harum nesciunt corporis deleniti. Iste, accusantium?</p>
                        <p className={styles.projectBackers}>{props.backers} backers</p>
                    </div>

                    <img
                        className={styles.picture}
                        src={props.photo}
                        alt="SubPhoto"
                    />
                </div>

                <form>
                    <div className={styles.fundingSection}>
                        <div>    
                            <label className={styles.label1}>Amount</label><br />
                            <label className={styles.label2}>$</label>
                            <input type="number" onChange={handleAmount} required/>
                        </div>
                        
                        <button className={styles.cancelButton} onClick={handleCancelButton}>Cancel</button>
                        <button type="submit"className={styles.fundingButton}>Fund {amount}$</button>
                    </div>
                </form>

            </div> 
        </div>
    );
}

FundingMenu.propTypes = {
    title: PropTypes.string,
    backers: PropTypes.number,
    photo: PropTypes.string,
}

export default FundingMenu;

