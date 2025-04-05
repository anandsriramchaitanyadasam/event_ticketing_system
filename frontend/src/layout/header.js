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

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("userData") || !!localStorage.getItem("vendor_Id")
  ); // Check initial login status
  const navigate = useNavigate();

  // Listen for login status changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(
        !!localStorage.getItem("userData") ||
          !!localStorage.getItem("vendor_Id")
      );
    };

    window.addEventListener("storage", handleStorageChange); // Listen for changes in localStorage
    return () => {
      window.removeEventListener("storage", handleStorageChange); // Cleanup
    };
  }, []);

  // Toggle Mobile Drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Open Profile Dropdown
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close Profile Dropdown
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("userData"); // Clear user data
    localStorage.removeItem("vendor_Id"); // Clear vendor data
    setIsLoggedIn(false); // Update state
    navigate("/login"); // Redirect to login
  };

  return (
    <AppBar position="static" className="header">
      <Toolbar className="toolbar">
        {/* Logo */}
        <Box className="logo">
          <Typography variant="h6" className="logo-text">
            Events
          </Typography>
        </Box>

        {/* Desktop Nav */}
        <Box className="nav-links">
          <a href="/home">Home</a>
          <a href="/events">Event</a>
          <a href="#">Categories</a>
        </Box>

        {/* Icons */}
        <Box className="icons">
          {isLoggedIn ? (
            // Show Profile Icon when logged in
            <>
              <IconButton className="icon" onClick={handleProfileClick}>
                <AccountCircleIcon />
              </IconButton>

              {/* Popover (Dropdown) */}
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
                {localStorage.getItem("userData") ? (
                  <MenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </MenuItem>
                ) : (
                  <MenuItem onClick={() => navigate("/vendor-profile")}>
                    Vendor Profile
                  </MenuItem>
                )}
                <Link
                  to="/booking"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem>My Bookings</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Popover>
            </>
          ) : (
            // Show Login Button when logged out
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}

          {/* Menu Button for Mobile */}
          <IconButton className="menu-button" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
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
