<<<<<<< HEAD
/** @format */

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Popover,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("userData") || !!localStorage.getItem("vendor_Id")
  );
  const vendorId = localStorage.getItem("vendor_Id");
  const userData = localStorage.getItem("userData");
  const isVendor = !!vendorId;
  const isUser = !!userData;
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(
        !!localStorage.getItem("userData") ||
          !!localStorage.getItem("vendor_Id")
      );
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

=======
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
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
  const handleClose = () => {
    setAnchorEl(null);
  };

<<<<<<< HEAD
  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("vendor_Id");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <AppBar position="static" className="header">
      <Toolbar className="toolbar">
        <Box className="logo">
          <Typography variant="h6" className="logo-text">
            Events
          </Typography>
        </Box>

        <Box className="nav-links">
          <a href="/home">Home</a>
          <a href="/events">Event</a>
          <a href="#categories">Categories</a>
        </Box>

        <Box className="icons">
          {isLoggedIn ? (
            <>
              {isVendor && (
                <a href="/notification">
                  <IconButton className="icon">
                    <CircleNotificationsIcon />
                  </IconButton>
                </a>
              )}
              <IconButton className="icon" onClick={handleProfileClick}>
                <AccountCircleIcon />
              </IconButton>

              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>

                <MenuItem onClick={() => navigate("/booking")}>
                  My Bookings
                </MenuItem>
                <MenuItem onClick={() => navigate("/paymenthistory")}>
                  My Payment
                </MenuItem>
                {isVendor && (
                  <MenuItem onClick={() => navigate("/getreviews")}>
                    Review & Ratings
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Popover>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}

          <IconButton className="menu-button" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        className="mobile-drawer"
      >
        <List>
          {["Home", "Event", "Categories"].map((text) => (
            <ListItem
              button
              key={text}
              onClick={() => navigate(`/${text.toLowerCase()}`)}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
=======
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
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
  );
}
