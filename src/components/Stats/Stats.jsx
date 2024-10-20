import "./Stats.css";

function Stats(props) {
    return (
        <div className="stats">
            <div className="stat">
                <h1>{props.fundedCount}</h1>
                <p>projects funded</p>
            </div>
            <div className="stat">
                <h1>{props.workCount}</h1>
                <p>towards creative work</p>
            </div>
            <div className="stat">
                <h1>{props.pledgeCount}</h1>
                <p>pledges</p>
            </div>
        </div>
    );
}

export default Stats;
