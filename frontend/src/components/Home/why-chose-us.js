import React from "react";
import "./WhyChooseUs.css";

const features = [
  { id: "01", title: "MULTIPLE EVENTS", description: "Manage multiple events efficiently with our platform." },
  { id: "02", title: "EVENT MANAGEMENT", description: "Seamlessly handle event planning and execution." },
  { id: "03", title: "CREDIT CARD PAYMENT", description: "Secure and fast transactions with multiple payment options." },
  { id: "04", title: "LOCATION MANAGEMENT", description: "Easily manage event locations with an interactive interface." },
  { id: "05", title: "FREE REGISTRATION", description: "Enjoy free and simple event registration." },
  { id: "06", title: "EASY TO USE", description: "Our platform is user-friendly and accessible to everyone." }
];

const WhyChooseUs = () => {
  return (
    <div className="why-container">
      <h2 className="why-title">WHY CHOOSE US</h2>
      <div className="why-grid">
        {features.map((feature, index) => (
          <div key={index} className="why-card">
            <div className="why-icon">{feature.id}</div>
            <h3 className="why-card-title">{feature.title}</h3>
            <p className="why-card-text">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
