import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem("userData");
    setIsLoggedIn(!!userData); // Convert to boolean (true if exists, false otherwise)
  }, []);
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userData"); // Remove user data
    setIsLoggedIn(false);
    setAnchorEl(null);
    navigate("/login"); // Redirect to login page
  };
  return (
    <div>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#348ef6",
          // backgroundColor: "#30a830",
          color: "black",
          boxShadow: "none",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "700", color: "white", marginLeft: "20px" }}
          >
            Event Management
          </Typography>
          <Box className="Header_tab">
            <a
              href="#"
              style={{
                fontSize: "18px",
                fontWeight: "500",
                color: "white",
                textDecoration: "none",

                padding: "30px",
              }}
            >
              Home
            </a>
            <a
              href="#"
              style={{
                fontSize: "18px",
                fontWeight: "500",
                color: "white",
                textDecoration: "none",
                fontWeight: "500",
                padding: "30px",
              }}
            >
              About Us
            </a>

            <a
              href="#"
              style={{
                fontSize: "18px",
                fontWeight: "500",
                color: "white",
                textDecoration: "none",
                fontWeight: "500",
                padding: "30px",
              }}
            >
              Contact
            </a>
          </Box>

          {isLoggedIn ? (
            <>
              {/* Profile Icon with Menu */}
              <IconButton onClick={handleClick}>
                <AccountCircleIcon sx={{ fontSize: "30px", color: "white" }} />
              </IconButton>

              {/* Popup Menu */}
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ marginRight: "20px" }}>
              <a href="/login" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  sx={{
                    marginRight: 1,
                    borderRadius: "8px",
                    border: "1px solid white",
                    color: "white",
                    fontWeight: "500",
                  }}
                >
                  Login
                </Button>
              </a>
              &nbsp;&nbsp;
              <a href="/" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    color: "#348ef6",
                  }}
                >
                  Sign Up
                </Button>
              </a>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
