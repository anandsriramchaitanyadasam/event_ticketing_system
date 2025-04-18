/** @format */

import React, { useEffect, useState } from "react"; // Importing necessary hooks from React
import Container from "react-bootstrap/Container"; // For creating a container to wrap the content
import { Box, Button, MenuItem, TextField } from "@mui/material"; // Importing Material-UI components
import { Link } from "react-router-dom"; // For navigation to different pages in the app
import { getApihandler } from "../../Apihandler"; // Importing custom API handler for making requests

export default function Banner() {
  // State hooks for managing form input values and fetched data
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To check if the user is logged in
  const [categoryname, setCategoryName] = useState(""); // For storing selected category name
  const [city, setCity] = useState(""); // For storing entered city
  const [eventdate, setEventDate] = useState(""); // For storing the selected event date
  const [categories, setCategories] = useState([]); // For storing categories fetched from the API

  // useEffect hook to check if the user is logged in and fetch categories when the component mounts
  useEffect(() => {
    const userToken = localStorage.getItem("role"); // Get user role from localStorage
    setIsLoggedIn(userToken); // Set the login status based on the role
    getCategory(); // Fetch categories from the API
  }, []);

  // Function to fetch categories from the backend API
  const getCategory = async () => {
    try {
      const res = await getApihandler("/admin/getAllCategories"); // API call to fetch categories
      if (res.message === "Categories fetched successfully") {
        setCategories(res.data); // Update state with fetched categories
      }
    } catch (error) {
      console.error("Error fetching categories:", error); // Log error if fetching fails
    }
  };

  // Function to construct the search URL based on selected filters
  const constructUrl = () => {
    const params = []; // Initialize an empty array to store query parameters

    if (categoryname) params.push(`category_name=${categoryname}`); // Add category name parameter if provided
    if (city) params.push(`city=${city}`); // Add city parameter if provided
    if (eventdate) params.push(`event_date=${eventdate}`); // Add event date parameter if provided

    // Join parameters with '&' and prepend the base URL path
    return `/userevents?${params.join("&")}`;
  };

  return (
    <>
      <section className="banner_sec">
        <Container>
          {isLoggedIn === "user" && (
            // Check if the user is logged in as a "user"
            <>
              {/* Main heading for the search section */}
              <div className="text-center main_heading">
                <h2>Find Nearby Location</h2>
                <h5>Explore top-rated attractions, activities and more!</h5>
              </div>

              {/* Search form with category, date, and city inputs */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  background: "white",
                  borderRadius: "30px",
                  padding: "10px 20px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  maxWidth: "900px",
                  margin: "auto",
                }}
              >
                {/* Category Dropdown */}
                <TextField
                  select
                  name="category_name"
                  value={categoryname} // Set the value of the category input
                  onChange={(e) => setCategoryName(e.target.value)} // Update the category state on change
                  variant="standard"
                  SelectProps={{ displayEmpty: true }} // Ensure placeholder is visible
                  sx={{
                    minWidth: "200px",
                    "& .MuiInput-underline:before": { borderBottom: "none" }, // Customize input border
                    "& .MuiInput-underline:after": { borderBottom: "none" }, // Customize input border
                  }}
                  InputProps={{ disableUnderline: true }} // Disable underline for the input field
                >
                  <MenuItem value="" disabled>
                    Select Category
                  </MenuItem> {/* Placeholder */}
                  {categories.map((cat) => (
                    // Dynamically populate category dropdown from categories state
                    <MenuItem key={cat._id} value={cat.category_name}>
                      {cat.category_name}
                    </MenuItem>
                  ))}
                </TextField>

                {/* Date Picker Input */}
                <TextField
                  type="date"
                  name="event_date"
                  value={eventdate} // Set the value of the date input
                  onChange={(e) => setEventDate(e.target.value)} // Update event date state on change
                  variant="standard"
                  sx={{
                    minWidth: "300px",
                    "& .MuiInput-underline:before": { borderBottom: "none" }, // Customize input border
                    "& .MuiInput-underline:after": { borderBottom: "none" }, // Customize input border
                  }}
                  InputProps={{ disableUnderline: true }} // Disable underline for the input field
                />

                {/* City Input */}
                <input
                  style={{ border: "none", padding: "10px" }}
                  placeholder="city" // Placeholder text for the input
                  fullWidth
                  value={city} // Set the value of the city input
                  onChange={(e) => setCity(e.target.value)} // Update city state on change
                />

                {/* Search Button - Links to the constructed URL */}
                <Link
                  to={constructUrl()} // Use URL parameters for navigation
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#ff3d7f", // Button background color
                      borderRadius: "30px",
                      padding: "10px 20px",
                      fontWeight: "bold",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#ff1f5a" }, // Button hover effect
                    }}
                  >
                    Search
                  </Button>
                </Link>
              </Box>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
