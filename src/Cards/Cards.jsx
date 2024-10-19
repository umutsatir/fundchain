import React, {useState} from "react";
import Proptypes from 'prop-types';
import './Cards.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Cards(props) {

    const [isSaved, setIsSaved] = useState(false);  //Is clicked the saved button?

    const handleSaveClick = () => {
        setIsSaved(!isSaved);
    }

    return(
        <div className="card">
            <img className="card-image" src={props.img} alt="Photo" />
            <div className="card-header">
                <img className="card-subimage" src={props.subimg} alt="SubPhoto" />
                <div className="card-proporties">
                    <h2 className="card-title">{props.title}</h2>
                    <p className="card-owner">{props.owner}</p>
                    <p className="card-deadline">
                        <i className="fa fa-clock"></i> {/* time symbol */}
                        {props.deadline} days left
                    </p>
                </div>
                {/* save button */}
                <button className={`card-saved-button ${isSaved ? "saved": ""}`} onClick={handleSaveClick}>
                    <i className="fa fa-bookmark"></i>  {/* FontAwesome Save Icon */}
                </button>
            </div>
            <p className="card-text">{props.text}</p>
        </div>
    );
}

Cards.proptypes = {
    img: Proptypes.string,
    subimg: Proptypes.string,
    title: Proptypes.string,
    owner: Proptypes.string,
    deadline: Proptypes.number,
    text: Proptypes.string,
}

export default Cards