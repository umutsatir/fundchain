import React, { useState, useEffect } from "react";
import styles from "./MediaGallery.module.css";

const MediaGallery = ({ mediaItems }) => {
    const [selectedMedia, setSelectedMedia] = useState(null);

    useEffect(() => {
        if (mediaItems.length > 0) {
            setSelectedMedia(mediaItems[0]);
        } else {
            setSelectedMedia(null);
        }
    }, [mediaItems]);

    return (
        <div className={styles.galleryContainer}>
            <div className={styles.previewArea}>
                {selectedMedia ? (
                    selectedMedia.type === "image" ? (
                        <img
                            src={selectedMedia.src}
                            alt="Selected"
                            className={styles.previewImage}
                        />
                    ) : (
                        <iframe
                            className={styles.previewVideo}
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${selectedMedia.src}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )
                ) : (
                    <p>No media available. Select an item below.</p>
                )}
            </div>

            <div className={styles.thumbnailContainer}>
                {mediaItems.length > 0 ? (
                    mediaItems.map((item, index) => (
                        <div
                            key={`${item.type}-${index}`}
                            className={`${styles.thumbnailItem} ${
                                selectedMedia &&
                                selectedMedia.type === item.type &&
                                selectedMedia.src === item.src
                                    ? styles.selected
                                    : ""
                            }`}
                            onClick={() => setSelectedMedia(item)}
                        >
                            {item.type === "image" ? (
                                <img
                                    src={item.src}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={styles.thumbnailImage}
                                />
                            ) : (
                                <div
                                    className={styles.thumbnailVideoPlaceholder}
                                >
                                    Video
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No thumbnails to display</p>
                )}
            </div>
        </div>
    );
};

export default MediaGallery;
