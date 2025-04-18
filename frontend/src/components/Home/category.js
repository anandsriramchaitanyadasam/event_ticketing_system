import React, { useEffect, useState } from "react";
import {
  FaShoppingBag,
  FaMusic,
  FaMicrophone,
  FaMapMarkerAlt,
  FaPlane,
} from "react-icons/fa";
import { getApihandler } from "../../Apihandler";

const categories = [
  { icon: <FaShoppingBag />, name: "Business" },
  { icon: <FaMusic />, name: "Concert" },
  { icon: <FaMicrophone />, name: "Conference" },
  { icon: <FaShoppingBag />, name: "Festival" },
  { icon: <FaMapMarkerAlt />, name: "Sport" },
  { icon: <FaPlane />, name: "Travel" },
];

const CategoryCards = () => {
  const [data, setData] = useState([]);

  //   ***** get category api *********
  useEffect(() => {
    getCategory();
  }, []);

  // ==== get category ========
  const getCategory = async () => {
    const res = await getApihandler("/admin/getAllCategories");
    console.log("get api res is --->", res);
    if (res.message === "Categories fetched successfully") {
      setData(res.data);
    }
  };

  return (
    <div className="container" id="categories">
      <h2 className="title" style={{ textAlign: "center", padding: "20px" }}>
        POPULAR CATEGORIES
      </h2>
      <div className="grid-container">
        {data.map((category, index) => (
          <div key={index} className="category-card">
            <div className="category-icon">
              <img
                style={{ width: "50%" }}
                src={`http://localhost:80/uploads/${category.photoUrl}`}
              />
            </div>
            <div className="category-text">{category.category_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
