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
import { apiUrl } from "../api_url";
import CommentItem from "../components/CommentItem/CommentItem";
import CommentCreate from "../components/CommentCreate/CommentCreate";

function Project({ handleNotification }) {
    const { id } = useParams();
    const [project, setProject] = useState({});
    const [story, setStory] = useState([]);
    const [comments, setComments] = useState([]);
    const [activeTab, setActiveTab] = useState("Campaign");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (isNaN(id)) {
            navigate("/error");
            return;
        }
        $.ajax({
            url: apiUrl + "/project.php",
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
            url: apiUrl + "/story.php",
            type: "GET",
            data: {
                projectId: id,
            },
            success: function (result) {
                result = JSON.parse(result);
                if (result.status) setStory(result.data);
                else handleNotification(result.message, "error");
            },
            error: function (error) {
                console.log(error);
                navigate("/error");
            },
        });

        $.ajax({
            url: apiUrl + "/viewComments.php",
            type: "POST",
            data: {
                projectId_input: id,
            },
            success: function (result) {
                result = JSON.parse(result);
                if (result.status) setComments(result.data);
                else handleNotification(result.message, "error");
            },
            error: function (error) {
                console.log(error);
                // navigate("/error");
            },
        });

        setIsLoading(false);
    }, []);

    return isLoading ? (
        <Loading />
    ) : (
        <div>
            <div className={styles.main}>
                <Intro
                    project={project}
                    handleNotification={handleNotification}
                />
                <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className={styles.bottom}>
                    <div className={styles.campaign}>
                        {activeTab === "Campaign" ? (
                            <Campaign story={story} />
                        ) : (
                            <div className={styles.commentsContainer}>
                                <CommentCreate projectId={id} />
                                <div className={styles.comments}>
                                    {comments.map((comment) => {
                                        <CommentItem comment={comment} />;
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                    {activeTab === "Campaign" && (
                        <div className={styles.rightCampaign}>
                            <ProjectOwner userId={project.userId} />
                            <Report id={id} />
                        </div>
                    )}
                </div>
                <RecommendedProjects userId={project.userId} />
            </div>
        </div>
    );
}

export default Project;
