import { useParams } from "react-router-dom";
import Error from "./Error";

function Project() {
    const { id } = useParams();

    if (!id) {
        return <Error />;
    }
    return (
        <div>
            <h1>Project {id}</h1>
        </div>
    );
}

export default Project;
