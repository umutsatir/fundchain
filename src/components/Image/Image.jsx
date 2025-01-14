import React, { useState } from "react";
import styles from "./Image.module.css";
import { apiUrl } from "../../api_url";

function Image({ formData, handleNotification, setImageData }) {
    const [images, setImages] = useState(formData.image || []);

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);

        // Check max upload limit
        if (files.length > 4) {
            handleNotification("You can upload up to 4 images", "error");
            return;
        }

        // Validate file types and sizes
        const validFiles = files.filter((file) => {
            if (
                ![
                    "image/jpeg",
                    "image/png",
                    "image/gif",
                    "image/webp",
                ].includes(file.type)
            ) {
                handleNotification("Invalid image type", "error");
                return false;
            }
            if (file.size > 10 * 1024 * 1024) {
                handleNotification("Image size limit is 10MB", "error");
                return false;
            }
            return true;
        });

        if (validFiles.length === 0) return;

        setImageData(validFiles);
        setImages(validFiles);
    };

    return (
        <div className={styles.section}>
            <h2>Project Image</h2>
            <p>
                Add an image that clearly represents your project. Choose one
                that looks good at different sizes.
            </p>
            <div className={styles.uploadWrapper}>
                <button
                    type="button"
                    className={styles.button}
                    onClick={() =>
                        document.getElementById("imageInput").click()
                    }
                >
                    Upload images
                </button>
                <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    multiple
                    onChange={handleImageUpload}
                />
                <div className={styles.previewContainer}>
                    {images.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Uploaded ${index + 1}`}
                            className={styles.previewImage}
                        />
                    ))}
                </div>
                <p>
                    Drop images here, or select files. JPG, PNG, GIF, or WEBP up
                    to 50MB each. Max 4 images.
                </p>
            </div>
        </div>
    );
}

export default Image;
