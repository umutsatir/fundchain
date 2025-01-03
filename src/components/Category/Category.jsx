import React, { useEffect, useState } from "react";
import styles from "./Category.module.css";
import $ from "jquery";
import { apiUrl } from "../../api_url";

function Category({ updateBasics, formData, activeTab }) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categoryOptions, setCategoryOptions] = useState([]);

    useEffect(() => {
        $.ajax({
            url: apiUrl + "/getCategories.php",
            type: "GET",
            success: function (result) {
                result = JSON.parse(result);
                if (result.status) {
                    setCategoryOptions(result.data);
                } else {
                    console.log(result.message);
                }
            },
            error: function (error) {
                console.log(error);
            },
        });
        setSelectedCategory(formData.category);
    }, []);

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        updateBasics("category", category);
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
                        {categoryOptions.length > 0 &&
                            categoryOptions.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Category;
