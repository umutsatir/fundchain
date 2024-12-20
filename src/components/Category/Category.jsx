import React, { useState, useEffect } from "react";
import styles from "./Category.module.css";

function Category({ updateBasics, formData }) {
    const [selectedPrimaryCategory, setSelectedPrimaryCategory] = useState(formData.category.primaryCategory || "");
    const [PrimarySubcategories, setPrimarySubcategories] = useState([]);

    const [selectedPrimarySubcategory, setSelectedPrimarySubcategory] = useState(formData.category.primarySubcategory || "");
    const [selectedCategory, setSelectedCategory] = useState(formData.category.secondaryCategory || "");
    const [Subcategories, setSubcategories] = useState([]);

    const [selectedSubcategory, setSelectedSubcategory] = useState(formData.category.secondarySubcategory || "");

    const categoryOptions = {
        Art: ["Painting", "Sculpture", "Photography"],
        Technology: ["AI", "Web Development", "Blockchain"],
        Games: ["Board Games", "Video Games", "Card Games"],
        Music: ["Rock", "Classical", "Pop"],
        Food: ["Cooking", "Baking", "Catering"],
    };

    useEffect(() => {
        // Set primary subcategories based on the selected primary category
        setPrimarySubcategories(categoryOptions[selectedPrimaryCategory] || []);
        // Reset the primary subcategory if primary category changes
        setSelectedPrimarySubcategory(formData.category.primarySubcategory || "");
    }, [selectedPrimaryCategory, formData.category.primarySubcategory]);

    useEffect(() => {
        // Set secondary subcategories based on the selected secondary category
        setSubcategories(categoryOptions[selectedCategory] || []);
        // Reset the secondary subcategory if secondary category changes
        setSelectedSubcategory(formData.category.secondarySubcategory || "");
    }, [selectedCategory, formData.category.secondarySubcategory]);

    const handlePrimaryCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedPrimaryCategory(category);
        setPrimarySubcategories(categoryOptions[category] || []);
        setSelectedPrimarySubcategory(""); // Clear subcategory when category changes
        updateBasics("category", {
            primaryCategory: category,
            primarySubcategory: "",
            secondaryCategory: selectedCategory,
            secondarySubcategory: selectedSubcategory,
        });
    };

    const handlePrimarySubcategoryChange = (e) => {
        const subcategory = e.target.value;
        setSelectedPrimarySubcategory(subcategory);
        updateBasics("category", {
            primaryCategory: selectedPrimaryCategory,
            primarySubcategory: subcategory,
            secondaryCategory: selectedCategory,
            secondarySubcategory: selectedSubcategory,
        });
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setSubcategories(categoryOptions[category] || []);
        setSelectedSubcategory(""); // Clear subcategory when category changes
        updateBasics("category", {
            primaryCategory: selectedPrimaryCategory,
            primarySubcategory: selectedPrimarySubcategory,
            secondaryCategory: category,
            secondarySubcategory: "",
        });
    };

    const handleSubcategoryChange = (e) => {
        const subcategory = e.target.value;
        setSelectedSubcategory(subcategory);
        updateBasics("category", {
            primaryCategory: selectedPrimaryCategory,
            primarySubcategory: selectedPrimarySubcategory,
            secondaryCategory: selectedCategory,
            secondarySubcategory: subcategory,
        });
    };

    return (
        <div className={styles.categoryContainer}>
            <div className={styles.categoryKnowledge}>
                <h1 className={styles.categoryTitle}>Project Category</h1>
                <p className={styles.categoryText}>
                    Choose a primary category and subcategory to help backers
                    find your project.
                </p>
                <p className={styles.categoryText}>
                    Your second subcategory will help us provide more relevant
                    guidance for your project. It won't display on your project
                    page or affect how it appears in search results.
                </p>
            </div>

            <div className={styles.categorySelection}>
                <div className={styles.categoryFormGroup}>
                    <label>Primary Category</label>
                    <br />
                    <select
                        className={styles.categoryFormControl}
                        name="primary"
                        onChange={handlePrimaryCategoryChange}
                        value={selectedPrimaryCategory}
                    >
                        <option value="">Select Category</option>
                        {Object.keys(categoryOptions).map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.categoryFormGroup}>
                    <label>Primary Subcategory</label>
                    <br />
                    <select
                        className={styles.categoryFormControl}
                        name="primarySub"
                        onChange={handlePrimarySubcategoryChange}
                        value={selectedPrimarySubcategory}
                        disabled={!PrimarySubcategories.length}
                    >
                        <option value="">Select Subcategory</option>
                        {PrimarySubcategories.map((subcategory) => (
                            <option key={subcategory} value={subcategory}>
                                {subcategory}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.categoryFormGroup}>
                    <label>Secondary Category</label>
                    <br />
                    <select
                        className={styles.categoryFormControl}
                        name="category"
                        onChange={handleCategoryChange}
                        value={selectedCategory}
                    >
                        <option value="">Select Category</option>
                        {Object.keys(categoryOptions).map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.categoryFormGroup}>
                    <label>Secondary Subcategory</label>
                    <br />
                    <select
                        className={styles.categoryFormControl}
                        name="subcategory"
                        onChange={handleSubcategoryChange}
                        value={selectedSubcategory}
                        disabled={!Subcategories.length}
                    >
                        <option value="">Select Subcategory</option>
                        {Subcategories.map((subcategory) => (
                            <option key={subcategory} value={subcategory}>
                                {subcategory}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Category;
