import Cards from "../Cards/Cards";
import styles from "./RecommendedProjects.module.css"; // Import the module CSS
import $ from "jquery";
import { apiUrl } from "../../api_url";
import { useEffect, useState } from "react";

function RecommendedProjects({ userId }) {
    const [projects, setProjects] = useState([]);

    function getDeadline(dbDate) {
        if (!dbDate) return;
        const currentDate = new Date();
        const [year, month, day] = dbDate.split("-");
        const targetDate = new Date(year, month - 1, day);
        const diffInMs = targetDate.getTime() - currentDate.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        return diffInDays;
    }

    function getRecommendedProjects() {
        if (!userId) return;
        $.ajax({
            url: apiUrl + "/recommendedProjects.php",
            type: "POST",
            data: {
                userId: userId,
            },
            success: function (result) {
                result = JSON.parse(result);
                if (result.status) {
                    setProjects(result.data);
                }
            },
            error: function (error) {
                console.log(error);
            },
        });
    }

    useEffect(() => {
        getRecommendedProjects();
    }, [userId]);

    return (
        <div className={styles.projects}>
            <div className={styles.name}>
                <h3>Recommended Projects</h3>
            </div>
            <div className={styles.cards}>
                {projects.map((project) => (
                    <Cards
                        key={project.projectId}
                        id={project.projectId}
                        img={JSON.parse(project.image)}
                        subimg={
                            JSON.parse(project.image).length > 1
                                ? JSON.parse(project.image)[1]
                                : ""
                        }
                        title={project.title}
                        owner={project.owner}
                        deadline={getDeadline(project.launchDate)}
                    />
                ))}
            </div>
            {projects.length == 0 && (
                <p className={styles.noProjects}>
                    It seems that you have already looked up all excellent
                    projects :)
                </p>
            )}
        </div>
    );
}

export default RecommendedProjects;
