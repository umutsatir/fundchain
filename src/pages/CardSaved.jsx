import { useEffect, useState } from "react";
import styles from "../styles/Search.module.css";
import { Cookies } from "react-cookie";
import Loading from "../components/Loading/Loading";
import Cards from "../components/Cards/Cards";
import $ from "jquery";

function CardSaved() {
    const cookies = new Cookies();
    const [projects, setProjects] = useState([]);
    const [savedProjects, setSavedProjects] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const handleSaveToggle = (projectId) => {
        setSavedProjects((prevSavedProjects) => ({
            ...prevSavedProjects,
            [projectId]: !prevSavedProjects[projectId],
        }));

        if (!savedProjects[projectId]) {
            setProjects(projects.filter((project) => project.id != projectId));
        }
    };

    function getDeadline(dbDate) {
        const currentDate = new Date();
        const targetDate = new Date(dbDate);
        const diffInMs = targetDate - currentDate;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        return diffInDays;
    }

    useEffect(() => {
        $.ajax({
            url: "http://localhost:8000/fundchain/api/savedProjects.php",
            type: "POST",
            data: {
                username: cookies.get("username"),
            },
            success: function (result) {
                result = JSON.parse(result);
                if (result.status) setProjects(result.data);
                else console.log(result.message, result.error);
            },
            error: function (error) {
                console.log(error);
                navigate("/error");
            },
        });

        setIsLoading(false);
    }, []);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : projects.length > 0 ? (
                <div className={styles.projects}>
                    <h2>Projects found:</h2>
                    <div className={styles.cards}>
                        {projects.map((project) => (
                            <Cards
                                id={project.id}
                                img={project.img}
                                subimg={project.subimg}
                                title={project.title}
                                owner={project.owner}
                                deadline={getDeadline(project.deadline)}
                                key={project.id}
                                onSaveToggle={handleSaveToggle}
                                isSaved={savedProjects[project.id] || false}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className={styles.projects}>
                    <h2>No projects found</h2>
                </div>
            )}
        </>
    );
}

export default CardSaved;
