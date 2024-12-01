import React, {useState} from "react";
import styles from "./Category.module.css";


function Category() {

    const [selectedPrimaryCategory, setSelectedPrimaryCategory] = useState("");
    const [PrimarySubcategories, setPrimarySubcategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [Subcategories, setSubcategories] = useState([]);

    const categoryOptions = {
        Art: ["Painting", "Sculpture", "Photography"],
        Technology: ["AI", "Web Development", "Blockchain"],
        Games: ["Board Games", "Video Games", "Card Games"],
        Music: ["Rock", "Classical", "Pop"],
        Food: ["Cooking", "Baking", "Catering"],
    }

    const handlePrimaryCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedPrimaryCategory(category);
        setPrimarySubcategories(categoryOptions[category] || []);
    }

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setSubcategories(categoryOptions[category] || []);
    }

    return(
        <div className={styles.categoryContainer}>

            <div className={styles.categoryKnowledge}>
                <h1 className={styles.categoryTitle}>Project Category</h1>
                <p className={styles.categoryText}>
                    Select categories and subcategories for your new project.
                </p>
                <p className={styles.categoryText}>
                    These will help backers find your project, and you can change them later if you need to.
                </p>
                <p className={styles.categoryText}>
                    These will help us provide more relevant guidance for your project.
                </p>
            </div>

            <div className={styles.categorySelection}>
                <div className={styles.categoryFormGroup}>
                    <label for="Primary Category">Primary Category</label><br />
                    <select
                        className={styles.categoryFormControl}
                        id="Primary Category"
                        onChange={handlePrimaryCategoryChange}
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
                    <label for="Primary Subcategory">Primary Subcategory</label><br />
                    <select className={styles.categoryFormControl} id="Primary Subcategory" disabled={!PrimarySubcategories.length}>
                        <option value="">Select Subcategory</option>
                        {PrimarySubcategories.map((subcategory) => (
                            <option key={subcategory} value={subcategory}>
                                {subcategory}
                            </option>
                        ))}
                    </select>
                </div>


                <div className={styles.categoryFormGroup}>
                    <label for="Category">Category</label><br />
                    <select
                        className={styles.categoryFormControl}
                        id="Category"
                        onChange={handleCategoryChange}
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
                    <label for="Subcategory">Subcategory</label><br />
                    <select className={styles.categoryFormControl} id="Subcategory" disabled={!Subcategories.length}>
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