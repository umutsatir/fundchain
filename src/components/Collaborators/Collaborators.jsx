import React, { useState, useEffect } from "react";
import styles from "./Collaborators.module.css";

function Category({ updateCollaborators, formData }) {
    const [Collaborators, setCollaborators] = useState(() => {
        if (formData.collaborators && formData.collaborators.length > 0) {
            return formData.collaborators
                .split("}, {")
                .map((collaborator) => {
                    collaborator = collaborator.replace(/[{}]/g, "");
                    const collaboratorList = collaborator.split(", ");
                    return {
                        email: collaboratorList[0],
                        title: collaboratorList[1],
                        permissions: collaboratorList.slice(2),
                    };
                });
        }
        return [];
    });



    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newCollaborator, setNewCollaborator] = useState({
        email: "",
        title: "",
    });
    const [editingCollaborator, setEditingCollaborator] = useState(null);
    const [editProject, setEditProject] = useState(false);
    const [manageCommunity, setManageCommunity] = useState(false);
    const [coordinateFulfillment, setCoordinateFulfillment] = useState(false);

    useEffect(() => {
        const collaboratorsList = Collaborators.map(collaborator => {
            const { email, title, permissions } = collaborator;
            return `{${email}, ${title}, {${permissions.join(", ")}}}`;
        }).join(", ");
    
        updateCollaborators("collaborators", collaboratorsList);
    }, [Collaborators, updateCollaborators]);
    

    const handleAddCollaborator = () => {
        const permissions = [
            editProject && "Edit project",
            manageCommunity && "Manage community",
            coordinateFulfillment && "Coordinate fulfillment",
        ].filter(Boolean); // Remove false values

        const collaboratorWithPermissions = { ...newCollaborator, permissions };

        setCollaborators([...Collaborators, collaboratorWithPermissions]);
        setIsPopupOpen(false);
        resetForm();
    };

    const handleEditClick = (index) => {
        const collaboratorToEdit = { ...Collaborators[index] };
        setEditingCollaborator({ ...collaboratorToEdit, index }); // Save with index

        setNewCollaborator({
            email: collaboratorToEdit.email,
            title: collaboratorToEdit.title,
        });
        setEditProject(collaboratorToEdit.permissions.includes("Edit project"));
        setManageCommunity(
            collaboratorToEdit.permissions.includes("Manage community")
        );
        setCoordinateFulfillment(
            collaboratorToEdit.permissions.includes("Coordinate fulfillment")
        );
        setIsPopupOpen(true);
    };

    const handleSaveChanges = () => {
        const updatedPermissions = [
            editProject && "Edit project",
            manageCommunity && "Manage community",
            coordinateFulfillment && "Coordinate fulfillment",
        ].filter(Boolean); // Remove false values

        const updatedCollaborator = {
            ...newCollaborator,
            permissions: updatedPermissions,
        };

        // Update the edited collaborator in the collaborators array
        const updatedCollaboratorsArray = [...Collaborators];
        updatedCollaboratorsArray[editingCollaborator.index] =
            updatedCollaborator;

        setCollaborators(updatedCollaboratorsArray);
        setIsPopupOpen(false);
        resetForm();
    };

    const handleRemoveCollaborator = (index) => {
        const updatedCollaboratorsArray = Collaborators.filter(
            (_, i) => i !== index
        ); // Get all collaborators except the one being removed
        setCollaborators(updatedCollaboratorsArray);
    };

    const handleEditProjectClick = () => {
        setEditProject(!editProject);
    };
    const handleManageCommunityClick = () => {
        setManageCommunity(!manageCommunity);
    };
    const handleCoordinateFulfillmentClick = () => {
        setCoordinateFulfillment(!coordinateFulfillment);
    };

    const resetForm = () => {
        setNewCollaborator({ email: "", title: "" });
        setEditProject(false);
        setManageCommunity(false);
        setCoordinateFulfillment(false);
        setEditingCollaborator(null);
    };

    const renderCollaborators = () => {
        if (Collaborators.length === 0) {
            return (
                <p className={styles.collaboratorDisplayText}>
                    You haven't added any collaborators yet.
                </p>
            );
        } else {
            return Collaborators.map((collaborator, index) => (
                <div key={index} className={styles.collaboratorPeopleContainer}>
                    <div className={styles.collaboratorTitleSection}>
                        <p className={styles.title}>{collaborator.title}</p>
                        <div className={styles.buttonContainer}>
                            <button
                                onClick={() => handleEditClick(index)}
                                className={styles.editButton}
                            >
                                <i className="fas fa-edit"></i>
                            </button>

                            <button
                                onClick={() => handleRemoveCollaborator(index)}
                                className={styles.editButton}
                            >
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <p className={styles.collaboratorPermissions}>
                        Permissions: {collaborator.permissions.join(", ")}
                    </p>
                    <div className={styles.divider}></div>
                </div>
            ));
        }
    };

    return (
        <div className={styles.collaboratorContainer}>
            <div className={styles.collaboratorKnowledge}>
                <h1 className={styles.collaboratorTitle}>
                    Collaborators (optional)
                </h1>
                <p className={styles.collaboratorText}>
                    If you are working with others, you can grant them
                    permission to edit this project, communicate with backers,
                    and coordinate reward fulfillment.
                </p>
            </div>

            <div className={styles.collaboratorDisplay}>
                {renderCollaborators()}

                <button
                    type="button"
                    className={styles.collaboratorButton}
                    onClick={() => setIsPopupOpen(true)}
                >
                    Add Collaborator
                </button>
            </div>

            {isPopupOpen && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <h2>
                            {editingCollaborator
                                ? "Edit Collaborator"
                                : "New Collaborator"}
                        </h2>
                        <form>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                value={newCollaborator.email}
                                placeholder="name@email.com"
                                required
                                onChange={(e) =>
                                    setNewCollaborator({
                                        ...newCollaborator,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <br />
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                value={newCollaborator.title}
                                placeholder="Collaborator"
                                required
                                onChange={(e) =>
                                    setNewCollaborator({
                                        ...newCollaborator,
                                        title: e.target.value,
                                    })
                                }
                            />
                            <div className={styles.divider}></div>

                            <p className={styles.popupPermissions}>
                                Permissions
                            </p>
                            <p className={styles.popupKnowledge}>
                                All collaborators will be able to access your
                                project data. This includes total funding, the
                                amount pledged and number of backers per reward,
                                video statistics, and referrals. Specify the
                                level of access this collaborator should have
                                below.
                            </p>

                            {/* Edit Project section */}
                            <div className={styles.permissions}>
                                <button
                                    type="button"
                                    className={`${styles.permissionButton} ${
                                        editProject ? styles.confirmed : ""
                                    }`}
                                    onClick={handleEditProjectClick}
                                >
                                    {editProject && (
                                        <i className="fas fa-check"></i>
                                    )}
                                </button>
                                <span className={styles.permissionText}>
                                    Edit project
                                </span>
                            </div>

                            {/* Manage Community section */}
                            <div className={styles.permissions}>
                                <button
                                    type="button"
                                    className={`${styles.permissionButton} ${
                                        manageCommunity ? styles.confirmed : ""
                                    }`}
                                    onClick={handleManageCommunityClick}
                                >
                                    {manageCommunity && (
                                        <i className="fas fa-check"></i>
                                    )}
                                </button>
                                <span className={styles.permissionText}>
                                    Manage community
                                </span>
                            </div>

                            {/* Coordinate fulfillment section */}
                            <div className={styles.permissions}>
                                <button
                                    type="button"
                                    className={`${styles.permissionButton} ${
                                        coordinateFulfillment
                                            ? styles.confirmed
                                            : ""
                                    }`}
                                    onClick={handleCoordinateFulfillmentClick}
                                >
                                    {coordinateFulfillment && (
                                        <i className="fas fa-check"></i>
                                    )}
                                </button>
                                <span className={styles.permissionText}>
                                    Coordinate fulfillment
                                </span>
                            </div>

                            <div className={styles.popupActions}>
                                <button
                                    onClick={() => setIsPopupOpen(false)}
                                    className={styles.popupCancelButton}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={
                                        editingCollaborator
                                            ? handleSaveChanges
                                            : handleAddCollaborator
                                    }
                                    className={styles.popupAddButton}
                                >
                                    {editingCollaborator
                                        ? "Save changes"
                                        : "Send invitation"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Category;
