import "./Stats.css";
import React, { useEffect, useState } from "react";
import $ from "jquery";

function Stats() {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        $.ajax({
            url: "http://localhost:8000/stats.php",
            type: "GET",
            success: function (data) {
                setStats(JSON.parse(data));
            },
            error: function (error) {
                console.log(error);
                setStats([0, 0, 0]);
            },
        });
    }, []);

    return (
        <div className="stats">
            <div className="stat">
                <h1>{stats["fundedProjects"]}</h1>
                <p>projects funded</p>
            </div>
            <div className="stat">
                <h1>{stats["users"]}</h1>
                <p>users</p>
            </div>
            <div className="stat">
                <h1>{stats["stillFunding"]}</h1>
                <p>projects still funding</p>
            </div>
        </div>
    );
}

export default Stats;
