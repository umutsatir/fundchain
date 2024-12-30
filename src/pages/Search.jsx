import { useEffect, useState } from "react";
import Cards from "../components/Cards/Cards";
import $ from "jquery";
import styles from "../styles/Search.module.css";
import Loading from "../components/Loading/Loading";
import { apiUrl } from "../api_url";

function Search() {
    const [projects, setProjects] = useState([]);
    const [savedProjects, setSavedProjects] = useState({}); // Track saved status
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchText = urlParams.get("q");
        if (searchText) {
            getResults(searchText);
        }
        setIsLoading(false);
    }, []);

    const handleSaveToggle = (projectId) => {
        setSavedProjects((prevSavedProjects) => ({
            ...prevSavedProjects,
            [projectId]: !prevSavedProjects[projectId],
        }));
    };

    function getDeadline(dbDate) {
        const currentDate = new Date();
        const targetDate = new Date(dbDate);
        const diffInMs = targetDate - currentDate;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        return diffInDays;
    }

    function getResults(searchText) {
        $.ajax({
            url: apiUrl + "/search.php",
            type: "GET",
            data: {
                search: searchText,
            },
            success: function (data) {
                setProjects(JSON.parse(data));
            },
            error: function (error) {
                console.log(error);
                setProjects([]);
            },
        });
    }

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

export default Search;
