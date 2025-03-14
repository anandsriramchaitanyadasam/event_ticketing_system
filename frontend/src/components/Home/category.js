import React from "react";
import { FaShoppingBag, FaMusic, FaMicrophone, FaMapMarkerAlt, FaPlane } from "react-icons/fa";

const categories = [
  { icon: <FaShoppingBag />, name: "Business" },
  { icon: <FaMusic />, name: "Concert" },
  { icon: <FaMicrophone />, name: "Conference" },
  { icon: <FaShoppingBag />, name: "Festival" },
  { icon: <FaMapMarkerAlt />, name: "Sport" },
  { icon: <FaPlane />, name: "Travel"},
];

const CategoryCards = () => {
  return (
    <div className="container">
      <h2 className="title" style={{textAlign:"center",padding:"20px"}}>POPULAR CATEGORIES</h2>
      <div className="grid-container">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <div className="category-icon">{category.icon}</div>
            <div className="category-text">{category.name}</div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
