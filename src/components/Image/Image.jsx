import React, {useState} from 'react';
import styles from './Image.module.css';

function Image({updateBasics, formData}) {
    const [images, setImages] = useState(formData.image || []);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 4) {
            alert("You can upload up to 4 photos.");
            return;
        }
        const newImages = files.map((file) => URL.createObjectURL(file));
        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        updateBasics("image", updatedImages);
    };

    return (
        <div className={styles.section}>
            <h2>Project Image</h2>
            <p>Add an image that clearly represents your project. Choose one that looks good at different sizes.</p>
            <div className={styles.uploadWrapper}>
                <button
                    type="button"
                    className={styles.button}
                    onClick={() => document.getElementById('imageInput').click()}
                >
                    Upload images
                </button>
                <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    multiple
                    onChange={handleImageUpload}
                />
                <div className={styles.previewContainer}>
                    {images.map((src, index) => (
                        <img key={index} src={src} alt={`Uploaded ${index + 1}`} className={styles.previewImage} />
                    ))}
                </div>
                <p>Drop images here, or select files. JPG, PNG, GIF, or WEBP up to 50MB each. Max 4 images.</p>
            </div>
        </div>
    );
}

export default Image;