import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import $ from "jquery";
import Intro from "../components/Intro/Intro";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Funding from "../components/Funding/Funding";
import Campaign from "../components/Campaign/Campaign";
import ProjectOwner from "../components/ProjectOwner/ProjectOwner";
import TabBar from "../components/TabBar/TabBar";
import RecommendedProjects from "../components/RecommendedProjects/RecommendedProjects";
import "../styles/Project.css";

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState({});

    useEffect(() => {
        if (isNaN(id)) {
            window.location.href = "/error";
            return;
        }
        $.ajax({
            url: "http://localhost:8000/project.php",
            type: "GET",
            data: {
                projectId: id,
            },
            success: function (data) {
                console.log(data);
                if (data.status == "true") setProject(data.project);
                // else window.location.href = "/error";
            },
            error: function (error) {
                console.log(error);
                window.location.href = "/error";
            },
        });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="main">
                <Intro />
                <TabBar />
                <div className="bottom">
                    <div className="campaign">
                        <Campaign />
                    </div>
                    <div className="projectOwner">
                        <ProjectOwner />
                    </div>
                </div>
                <RecommendedProjects />
            </div>
            <Footer />
        </div>
    );
}

export default Project;
