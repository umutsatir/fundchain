import React, {useState} from 'react';
import styles from './Video.module.css';

function Video() {
    const [video, setVideo] = useState(null);

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(URL.createObjectURL(file));
        }
    };

    return (
    <div className={styles.section}>
        <h2>Project Video (optional)</h2>
        <p>Add a video to showcase your project. Recommended file formats are MP4 or MOV.</p>
        <div className={styles.uploadWrapper}>
            <button
                type="button"
                className={styles.button}
                onClick={() => document.getElementById('videoInput').click()}
            >
                Upload a video
            </button>
            <input
                type="file"
                id="videoInput"
                accept="video/*"
                style={{ display: 'none' }}
                onChange={handleVideoUpload}
            />
            {video && <video src={video} controls className={styles.previewVideo} />}
            <p>Drop a video here, or select a file. MP4 or MOV up to 500MB.</p>
        </div>
    </div>
    );
}

export default Video;