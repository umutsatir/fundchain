// Campaign.jsx
import React, { useState } from "react";
import "./Campaign.css";

function Campaign() {
  const [activeTab, setActiveTab] = useState("");

  // Başlık ve içerik verileri
  const tabContent = [
    {
      title: "Introduction",
      content: "This is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign."
    },
    {
      title: "Additional Topic",
      content: "This is the description content for the Additional Topic tab. Here you can discuss more details.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign."
    },
    {
      title: "Additional Topic2",
      content: "This is the description content for the Additional Topic tab. Here you can discuss more details.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign."
    },
    {
      title: "Additional Topic3",
      content: "This is the description content for the Additional Topic tab. Here you can discuss more details."
    },
    {
      title: "Additional Topic4",
      content: "This is the description content for the Additional Topic tab. Here you can discuss more details.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign."
    },
    {
      title: "Additional Topic5",
      content: "This is the description content for the Additional Topic tab. Here you can discuss more details.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign.his is the description content for the Introduction tab. It provides an overview of the campaign."
    },
  ];

  // Scroll fonksiyonu
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const element = document.getElementById(tab);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="campaign-bar">
      <div className="campaign-tabs">
        {tabContent.map((tab, index) => (
          <div
            key={index}
            className={`campaign-tab ${activeTab === tab.title ? "active" : ""}`}
            onClick={() => handleTabClick(tab.title)}
          >
            {tab.title}
            {activeTab === tab.title && <div className="top-indicator"></div>}
          </div>
        ))}
      </div>

      <div className="description-container">
        <h2>Story</h2>
        {tabContent.map((tab, index) => (
          <div key={index} id={tab.title} className="content-section">
            <h3>{tab.title}</h3>
            <p>{tab.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Campaign;
