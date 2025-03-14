/** @format */

import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import sliderimg1 from "../../Images/plantbanner.avif";
import sliderimg2 from "../../Images/plantbanner1.avif";
import sliderimg3 from "../../Images/plantbanner2.jpg";
import Container from "react-bootstrap/Container";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
export default function Banner() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categoryname, setCategoryName] = useState("");
  const [city, setCity] = useState("");
  const [eventdate, setEventDate] = useState("");
  useEffect(() => {
    const userToken = localStorage.getItem("userData");
    setIsLoggedIn(!!userToken);
  }, []);

  return (
    <>
      <section className="banner_sec">
        <Container>
          <div className="text-center main_heading">
            <h2>Find Nearby Location</h2>
            <h5>Explore top-rated attractions, activities and more!</h5>
          </div>
          {isLoggedIn && (
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
                sx={{
                  minWidth: "200px",
                  "& .MuiInput-underline:before": { borderBottom: "none" },
                  "& .MuiInput-underline:after": { borderBottom: "none" },
                }}
                InputProps={{ disableUnderline: true }}
              >
                <MenuItem value="">Select Category</MenuItem>
                <MenuItem value="Music">Music</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Art">Art</MenuItem>
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
              <TextField
                select
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                variant="standard"
                sx={{
                  minWidth: "200px",
                  "& .MuiInput-underline:before": { borderBottom: "none" },
                  "& .MuiInput-underline:after": { borderBottom: "none" },
                }}
                InputProps={{ disableUnderline: true }}
              >
                <MenuItem value="">Select City</MenuItem>
                <MenuItem value="jaipur">Jaipur</MenuItem>
                <MenuItem value="delhi">Delhi</MenuItem>
                <MenuItem value="mumbai">Mumbai</MenuItem>
              </TextField>

              {/* Search Button Wrapped with Link */}
              <Link
                to={`/userevents/${categoryname}/${eventdate}/${city}`} // Use URL parameters
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
          )}
        </Container>
      </section>
    </>
  );
}
