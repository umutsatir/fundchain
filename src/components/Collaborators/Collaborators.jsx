import React, {useState} from "react";
import styles from "./Collaborators.module.css";


function Category() {

    const [Collaborators, setCollaborators] = useState([]);

    const renderCollaborators = () => {
        if(Collaborators.length == 0) {
            return(
                <p className={styles.collaboratorDisplayText}>You haven't added any collaborators yet.</p>
            );
        }
        else {
            return(
                <p>qefe2eqkqcnşkekjejf</p>
            );
        }
    }

    const addCollaborator = () => {
        setCollaborators([...Collaborators, `Collaborator ${Collaborators.length+1}`])
    }

    return(
        <div className={styles.collaboratorContainer}>

            <div className={styles.collaboratorKnowledge}>
                <h1 className={styles.collaboratorTitle}>Collaborators (optional)</h1>
                <p className={styles.collaboratorText}>
                    If you are working with others, you can grant them permission to edit this project,
                    communicate with backers, and coordinate reward fulfillment.
                </p>
            </div>

            <div className={styles.collaboratorDisplay}>
                
                {renderCollaborators()}

                <button
                    type="button"
                    className={styles.collaboratorButton}
                    onClick={addCollaborator}
                >
                    Add Collaborator
                </button>
            </div>
        </div>
    );
}

export default Category;