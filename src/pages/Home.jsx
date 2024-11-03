import "../styles/Home.css";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Cards from "../components/Cards/Cards";
import Stats from "../components/Stats/Stats";
import Loading from "../components/Loading/Loading";

function Home() {
    const [projects, setProjects] = useState({ popular: [], trending: [] });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("http://localhost:8000/home.php");
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setProjects({ popular: [], trending: [] });
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    function getDeadline(dbDate) {
        const currentDate = new Date(); // Current date
        const targetDate = new Date(dbDate); // Date from the database

        // Calculate the difference in milliseconds
        const diffInMs = currentDate - targetDate;

        // Convert milliseconds to days
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        return diffInDays;
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="body">
            <Navbar />
            <div className="stats-wrapper">
                <div className="title">
                    <h1>Fundchain</h1>
                    <h2>World's first Blockchain based funding platform</h2>
                </div>
                <Stats className="stats" />
            </div>
            <div className="main">
                <div className="projects">
                    <div className="name">
                        <h3>Popular Projects</h3>
                    </div>
                    <div className="cards">
                        {projects["popular"].map((project) => (
                            <Cards
                                id={project.id}
                                img={project.img}
                                subimg={project.subimg}
                                title={project.title}
                                owner={project.owner}
                                deadline={getDeadline(project.deadline)}
                                key={project.id + 3214}
                            />
                        ))}
                    </div>
                </div>
                <div className="projects">
                    <div className="name">
                        <h3>Trending Projects</h3>
                    </div>
                    <div className="cards">
                        {projects["trending"].map((project) => (
                            <Cards
                                id={project.id}
                                img={project.img}
                                subimg={project.subimg}
                                title={project.title}
                                owner={project.owner}
                                deadline={getDeadline(project.deadline)}
                                key={project.id + 123}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
