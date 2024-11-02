import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Cards from "../components/Cards/Cards";
import $ from "jquery";
import "../styles/Home.css";

function Search() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchText = urlParams.get("q");
        if (searchText) {
            getResults(searchText);
        }
    }, []);

    function getResults(searchText) {
        $.ajax({
            url: "http://localhost:8000/search.php",
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
            <Navbar />
            {projects.length > 0 ? (
                <div className="projects">
                    <h2>Projects found:</h2>
                    {projects.map((project) => (
                        <Cards
                            id={project.id}
                            img={project.img}
                            subimg={project.subimg}
                            title={project.title}
                            owner={project.owner}
                            deadline={project.deadline}
                            key={project.id}
                        />
                    ))}
                </div>
            ) : (
                <div className="projects">
                    <h2>No projects found</h2>
                </div>
            )}
            <Footer />
        </>
    );
}

export default Search;
