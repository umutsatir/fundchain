import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import $, { type } from "jquery";
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
    const [mediaItems, setMediaItems] = useState([]);
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
                if (data.status == -1) {
                    navigate("/error");
                    return;
                }
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
                projectId: id,
            },
            success: function (result) {
                result = JSON.parse(result);
                if (result.status) setComments(result.data);
                else handleNotification(result.message, "error");
            },
            error: function (error) {
                console.log(error);
                handleNotification("Failed to fetch comments", "error");
            },
        });

        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!project.img) return;
        const images = JSON.parse(project.img).map((image) => {
            return {
                type: "image",
                src: image,
            };
        });
        const video = project.video
            ? {
                  type: "video",
                  src: project.video,
              }
            : null;
        const newMediaItems = video ? [video, ...images] : images;
        setMediaItems(newMediaItems);
    }, [project]);

    const handleCommentRefresh = () => {
        $.ajax({
            url: apiUrl + "/viewComments.php",
            type: "POST",
            data: {
                projectId: id,
            },
            success: function (result) {
                result = JSON.parse(result);
                if (result.status) setComments(result.data);
                else handleNotification(result.message, "error");
            },
            error: function (error) {
                console.log(error);
                handleNotification("Failed to fetch comments", "error");
            },
        });
    };

    return isLoading ? (
        <Loading />
    ) : (
        <div>
            <div className={styles.main}>
                <Intro
                    project={project}
                    handleNotification={handleNotification}
                    mediaItems={mediaItems}
                />
                <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className={styles.bottom}>
                    <div className={styles.campaign}>
                        {activeTab === "Campaign" ? (
                            <Campaign story={story} />
                        ) : (
                            <div className={styles.commentsContainer}>
                                <CommentCreate
                                    projectId={id}
                                    handleNotification={handleNotification}
                                    handleCommentRefresh={handleCommentRefresh}
                                />
                                <div className={styles.comments}>
                                    {comments.map((comment) => {
                                        return (
                                            <CommentItem
                                                key={comment.id}
                                                comment={comment}
                                            />
                                        );
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
