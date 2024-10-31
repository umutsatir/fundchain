import "../styles/Home.css";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Cards from "../components/Cards/Cards";
import Stats from "../components/Stats/Stats";
import Loading from "../components/Loading/Loading";
import $ from "jquery";

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
                                img={project.img}
                                subimg={project.subimg}
                                title={project.title}
                                owner={project.owner}
                                deadline={project.deadline}
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
                                img={project.img}
                                subimg={project.subimg}
                                title={project.title}
                                owner={project.owner}
                                deadline={project.deadline}
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
