import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import $ from "jquery";
import Intro from "../components/Intro/Intro";
import Campaign from "../components/Campaign/Campaign";
import ProjectOwner from "../components/ProjectOwner/ProjectOwner";
import TabBar from "../components/TabBar/TabBar";
import RecommendedProjects from "../components/RecommendedProjects/RecommendedProjects";
import styles from "../styles/Project.module.css";
import Loading from "../components/Loading/Loading";
import Report from "../components/Report/Report";

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState({});
    const [story, setStory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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

        $.ajax({
            url: "http://localhost:8000/story.php",
            type: "GET",
            data: {
                projectId: id,
            },
            success: function (result) {
                result = JSON.parse(result);
                if (result.status) setStory(result.data);
                else console.log(result.message);
            },
            error: function (error) {
                console.log(error);
                navigate("/error");
            },
        });

        setIsLoading(false);
    }, []);

    return isLoading ? (
        <Loading />
    ) : (
        <div>
            <div className={styles.main}>
                <Intro project={project} />
                <TabBar />
                <div className={styles.bottom}>
                    <div className={styles.campaign}>
                        <Campaign story={story} />
                    </div>
                    <div className={styles.rightCampaign}>
                        <ProjectOwner userId={project.userId} />
                        <Report id={id} />
                    </div>
                </div>
                <RecommendedProjects userId={project.userId} />
            </div>
        </div>
    );
}

export default Project;
