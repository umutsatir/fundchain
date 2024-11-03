import Cards from "../Cards/Cards";
import "./RecommendedProjects.css";

function RecommendedProjects({ userId }) {
    return (
        <div className="projects">
            <div className="name">
                <h3>Recommended Projects</h3>
            </div>
            <div className="cards">
                <Cards
                    id={3}
                    img="https://via.placeholder.com/150"
                    subimg="https://via.placeholder.com/150"
                    title="Project 3"
                    owner="Owner 3"
                    deadline="2022-12-31"
                />
                <Cards
                    id={4}
                    img="https://via.placeholder.com/150"
                    subimg="https://via.placeholder.com/150"
                    title="Project 4"
                    owner="Owner 4"
                    deadline="2022-12-31"
                />
                <Cards
                    id={5}
                    img="https://via.placeholder.com/150"
                    subimg="https://via.placeholder.com/150"
                    title="Project 5"
                    owner="Owner 5"
                    deadline="2022-12-31"
                />
            </div>
        </div>
    );
}

export default RecommendedProjects;
