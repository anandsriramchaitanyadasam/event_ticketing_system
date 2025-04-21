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
import { useNavigate } from "react-router-dom";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";

export default function Header() {
  // State for mobile drawer toggle
  const [mobileOpen, setMobileOpen] = useState(false);
  // State to manage the profile popover anchor
  const [anchorEl, setAnchorEl] = useState(null);
  // State to determine if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("userData") || !!localStorage.getItem("vendor_Id")
  );
  // Vendor-specific check
  const vendorId = localStorage.getItem("vendor_Id");
  const isVendor = !!vendorId;

  // Navigation hook
  const navigate = useNavigate();

  // Keep track of login/logout status using localStorage changes
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

  // Toggle mobile menu
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Open profile popover
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close profile popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Logout function clears localStorage and redirects
  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("vendor_Id");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <AppBar position="static" className="header">
      <Toolbar className="toolbar">
        {/* Logo Section */}
        <Box className="logo">
          <Typography variant="h6" className="logo-text">
            Events
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box className="nav-links">
          <a href="/home">Home</a>
          <a href="/events">Event</a>
          <a href="#categories">Categories</a>
        </Box>

        {/* Right-side Icons/Actions */}
        <Box className="icons">
          {isLoggedIn ? (
            <>
              {/* Show notifications only if vendor is logged in */}
              {isVendor && (
                <a href="/notification">
                  <IconButton className="icon">
                    <CircleNotificationsIcon />
                  </IconButton>
                </a>
              )}

              {/* Profile Icon */}
              <IconButton className="icon" onClick={handleProfileClick}>
                <AccountCircleIcon />
              </IconButton>

              {/* Profile Popover Dropdown */}
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
                {/* Only vendor can see reviews */}
                {isVendor && (
                  <MenuItem onClick={() => navigate("/getreviews")}>
                    Review & Ratings
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Popover>
            </>
          ) : (
            // Show Login Button if not logged in
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}

          {/* Hamburger Menu Icon for Mobile */}
          <IconButton className="menu-button" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Drawer for Mobile View */}
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
  );
}
