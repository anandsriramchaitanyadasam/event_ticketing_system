import React from "react";
import "./StatsCounter.css";
import { FaUsers, FaMapMarkerAlt, FaGlobe, FaDollarSign } from "react-icons/fa";

const stats = [
  { id: 1, icon: <FaUsers />, value: "1256", label: "PARTICIPANT" },
  { id: 2, icon: <FaMapMarkerAlt />, value: "255", label: "TOTAL EVENTS" },
  { id: 3, icon: <FaGlobe />, value: "09", label: "VENUES" },
  { id: 4, icon: <FaDollarSign />, value: "19", label: "SPONSORS" }
];

const StatsCounter = () => {
  return (
    <div className="stats-container">
      {stats.map((stat) => (
        <div key={stat.id} className="stat-box">
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCounter;
