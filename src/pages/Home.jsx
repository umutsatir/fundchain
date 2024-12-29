import { useEffect, useState } from "react";
import Cards from "../components/Cards/Cards";
import Stats from "../components/Stats/Stats";
import Loading from "../components/Loading/Loading";
import styles from "../styles/Home.module.css"; // Import the CSS module

function Home() {
    const [projects, setProjects] = useState({ popular: [], trending: [] });
    const [savedProjects, setSavedProjects] = useState({}); // Track saved status
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/home.php"
                );
                const data = await response.json();
                setProjects(data);

                // Initialize savedProjects based on the response data
                const initialSavedState = {};
                data.popular.concat(data.trending).forEach((project) => {
                    initialSavedState[project.id] = project.isSaved || false;
                });
                setSavedProjects(initialSavedState);
            } catch (error) {
                console.error("Error fetching data:", error);
                setProjects({ popular: [], trending: [] });
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
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

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className={styles.body}>
            <div className={styles.statsWrapper}>
                <div className={styles.title}>
                    <h1>Fundchain</h1>
                    <h2>World's first Blockchain based funding platform</h2>
                </div>
                <Stats className={styles.stats} />
            </div>
            <div className="main">
                <div className={styles.projects}>
                    <div className={styles.name}>
                        <h3>Popular Projects</h3>
                    </div>
                    <div className={styles.cards}>
                        {projects.popular.map((project) => (
                            <Cards
                                key={project.id}
                                id={project.id}
                                img={project.img}
                                subimg={project.subimg}
                                title={project.title}
                                owner={project.owner}
                                deadline={getDeadline(project.deadline)}
                                isSaved={savedProjects[project.id] || false}
                                onSaveToggle={handleSaveToggle}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.projects}>
                    <div className={styles.name}>
                        <h3>Trending Projects</h3>
                    </div>
                    <div className={styles.cards}>
                        {projects.trending.map((project) => (
                            <Cards
                                key={project.id}
                                id={project.id}
                                img={project.img}
                                subimg={project.subimg}
                                title={project.title}
                                owner={project.owner}
                                deadline={getDeadline(project.deadline)}
                                isSaved={savedProjects[project.id] || false}
                                onSaveToggle={handleSaveToggle}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
