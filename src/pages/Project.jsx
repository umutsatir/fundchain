import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import $ from "jquery";
import Intro from "../components/Intro/Intro";
import Campaign from "../components/Campaign/Campaign";
import ProjectOwner from "../components/ProjectOwner/ProjectOwner";
import TabBar from "../components/TabBar/TabBar";
import RecommendedProjects from "../components/RecommendedProjects/RecommendedProjects";
import styles from "../styles/Project.module.css";

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (isNaN(id)) {
            navigate("/error");
            return;
        }
        $.ajax({
            url: "http://localhost:8000/project.php",
            type: "GET",
            data: {
                projectId: id,
            },
            success: function (data) {
                data = JSON.parse(data);
                if (data.success) setProject(data);
                else navigate("/error");
            },
            error: function (error) {
                console.log(error);
                navigate("/error");
            },
        });
    }, []);

    return (
        <div>
            <div className={styles.main}>
                <Intro project={project} />
                <TabBar />
                <div className={styles.bottom}>
                    <div className={styles.campaign}>
                        <Campaign />
                    </div>
                    <div className={styles.projectOwner}>
                        <ProjectOwner userId={project.userId} />
                    </div>
                </div>
                <RecommendedProjects userId={project.userId} />
            </div>
        </div>
    );
}

export default Project;
