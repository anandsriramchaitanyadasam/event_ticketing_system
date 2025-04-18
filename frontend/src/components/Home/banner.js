/** @format */

import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { getApihandler } from "../../Apihandler";
export default function Banner() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categoryname, setCategoryName] = useState("");
  const [city, setCity] = useState("");
  const [eventdate, setEventDate] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const userToken = localStorage.getItem("role");
    setIsLoggedIn(userToken);
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const res = await getApihandler("/admin/getAllCategories");
      if (res.message === "Categories fetched successfully") {
        setCategories(res.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  // ***** for search functioanlity **************
  const constructUrl = () => {
    const params = [];

    if (categoryname) params.push(`category_name=${categoryname}`);
    if (city) params.push(`city=${city}`);
    if (eventdate) params.push(`event_date=${eventdate}`);

    // Join parameters with '&' and prepend '/resultpage?'
    return `/events?${params.join("&")}`;
  };
  return (
    <>
      <section className="banner_sec">
        <Container>
          {isLoggedIn === "user" && (
            <>
              <div className="text-center main_heading">
                <h2>Find Nearby Location</h2>
                <h5>Explore top-rated attractions, activities and more!</h5>
              </div>

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
                {/* Category Input */}
                <TextField
                  select
                  name="category_name"
                  value={categoryname}
                  onChange={(e) => setCategoryName(e.target.value)}
                  variant="standard"
                  SelectProps={{ displayEmpty: true }}
                  sx={{
                    minWidth: "200px",
                    "& .MuiInput-underline:before": { borderBottom: "none" },
                    "& .MuiInput-underline:after": { borderBottom: "none" },
                  }}
                  InputProps={{ disableUnderline: true }}
                >
                  <MenuItem value="" disabled>
                    Select Category
                  </MenuItem>{" "}
                  {/* Placeholder */}
                  {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat.category_name}>
                      {cat.category_name}
                    </MenuItem>
                  ))}
                </TextField>

                {/* Date Input */}
                <TextField
                  type="date"
                  name="event_date"
                  value={eventdate}
                  onChange={(e) => setEventDate(e.target.value)}
                  variant="standard"
                  sx={{
                    minWidth: "300px",
                    "& .MuiInput-underline:before": { borderBottom: "none" },
                    "& .MuiInput-underline:after": { borderBottom: "none" },
                  }}
                  InputProps={{ disableUnderline: true }}
                />

                {/* City Input */}

                <input
                  style={{ border: "none", padding: "10px" }}
                  placeholder="city"
                  fullWidth
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />

                <Link
                  to={constructUrl()} // Use URL parameters
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#ff3d7f",
                      borderRadius: "30px",
                      padding: "10px 20px",
                      fontWeight: "bold",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#ff1f5a" },
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
