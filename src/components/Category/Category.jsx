import React, { useState, useEffect } from "react";
import styles from "./Category.module.css";

function Category() {
    const [selectedCategory, setSelectedCategory] = useState("");

    const [selectedSubcategory, setSelectedSubcategory] = useState(formData.category.secondarySubcategory || "");

    const categoryOptions = {
        Art: ["Painting", "Sculpture", "Photography"],
        Technology: ["AI", "Web Development", "Blockchain"],
        Games: ["Board Games", "Video Games", "Card Games"],
        Music: ["Rock", "Classical", "Pop"],
        Food: ["Cooking", "Baking", "Catering"],
    };
    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
    };

    return (
        <div className={styles.categoryContainer}>
            <div className={styles.categoryKnowledge}>
                <h1 className={styles.categoryTitle}>Project Category</h1>
                <p className={styles.categoryText}>
                    Choose a category to help backers find your project.
                </p>
                <p className={styles.categoryText}>
                    Your category will help us provide more relevant guidance
                    for your project.
                </p>
            </div>

            <div className={styles.categorySelection}>
                <div className={styles.categoryFormGroup}>
                    <label>Category</label>
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
            </div>
        </div>
    );
}

export default Category;
