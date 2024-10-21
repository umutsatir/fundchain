import "../styles/Home.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Cards from "../components/Cards/Cards";
import Stats from "../components/Stats/Stats";

function Home() {
    return (
        <div className="body">
            <div className="stats-wrapper">
                <div className="title">
                    <h1>Fundchain</h1>
                    <h2>World's first Blockchain based funding platform</h2>
                </div>
                <Stats
                    fundedCount={"123,123"}
                    pledgeCount={"123,123"}
                    workCount={"123,123"}
                    className="stats"
                />
            </div>
            <div className="main">
                <div className="projects">
                    <div className="name">
                        <h3>Popular Projects</h3>
                    </div>
                    <div className="cards">
                        {[...Array(9)].map((_, i) => (
                            <Cards
                                img="https://images.pexels.com/photos/4417069/pexels-photo-4417069.jpeg?cs=srgb&dl=pexels-dylan-chan-2880813-4417069.jpg&fm=jpg"
                                subimg="https://images.pexels.com/photos/4417069/pexels-photo-4417069.jpeg?cs=srgb&dl=pexels-dylan-chan-2880813-4417069.jpg&fm=jpg"
                                title="Lorem ipsum amet."
                                owner="John Doe"
                                deadline={i + 5}
                                text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, quaerat!"
                                key={i + 5}
                            />
                        ))}
                    </div>
                </div>
                <div className="projects">
                    <div className="name">
                        <h3>Trending Projects</h3>
                    </div>
                    <div className="cards">
                        {[...Array(6)].map((_, i) => (
                            <Cards
                                img="https://images.pexels.com/photos/4417069/pexels-photo-4417069.jpeg?cs=srgb&dl=pexels-dylan-chan-2880813-4417069.jpg&fm=jpg"
                                subimg="https://images.pexels.com/photos/4417069/pexels-photo-4417069.jpeg?cs=srgb&dl=pexels-dylan-chan-2880813-4417069.jpg&fm=jpg"
                                title="Lorem ipsum amet."
                                owner="John Doe"
                                deadline={i + 8}
                                text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, quaerat!"
                                key={i + 888}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
