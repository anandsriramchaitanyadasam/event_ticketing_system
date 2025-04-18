// Importing React library for component creation, and hooks for state and effect management
import React, { useEffect, useState } from "react";

// Importing icons from react-icons library
import { FaShoppingBag, FaMusic, FaMicrophone, FaMapMarkerAlt, FaPlane } from "react-icons/fa";

// Importing a custom API handler to fetch data
import { getApihandler } from "../../Apihandler";

// Defining a static array of category objects with their icons and names
const categories = [
  { icon: <FaShoppingBag />, name: "Business" },  // Icon for Business
  { icon: <FaMusic />, name: "Concert" },         // Icon for Concert
  { icon: <FaMicrophone />, name: "Conference" }, // Icon for Conference
  { icon: <FaShoppingBag />, name: "Festival" },  // Icon for Festival
  { icon: <FaMapMarkerAlt />, name: "Sport" },    // Icon for Sport
  { icon: <FaPlane />, name: "Travel" },          // Icon for Travel
];

// CategoryCards component
const CategoryCards = () => {
  // State to hold category data fetched from the API
  const [data, setData] = useState([]);

  // Fetch the categories on component mount
  useEffect(() => {
    getCategory();  // Call getCategory function
  }, []);

  // Function to fetch category data from the server
  const getCategory = async () => {
    try {
      // Sending GET request to fetch categories
      const res = await getApihandler("/admin/getAllCategories");
      console.log("get api res is --->", res);
      
      // Check if the response was successful and set the data
      if (res.message === "Categories fetched successfully") {
        setData(res.data);  // Store the fetched categories in state
      }
    } catch (error) {
      console.error("Error fetching categories:", error);  // Error handling for API request
    }
  };

  return (
    <div className="container">
      {/* Title of the section */}
      <h2 className="title" style={{ textAlign: "center", padding: "20px" }}>POPULAR CATEGORIES</h2>
      
      {/* Grid container to hold category cards */}
      <div className="grid-container">
        {/* Mapping through the fetched categories to display each category card */}
        {data.map((category, index) => (
          <div key={index} className="category-card">
            {/* Category image */}
            <div className="category-icon">
              <img style={{ width: "50%" }} src={`http://localhost:80/uploads/${category.photoUrl}`} alt={category.category_name} />
            </div>
            {/* Category name */}
            <div className="category-text">{category.category_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Exporting the CategoryCards component to be used in other parts of the application
export default CategoryCards;
