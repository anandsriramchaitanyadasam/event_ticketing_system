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

  const handleClose = () => {
    setAnchorEl(null);
  };

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
  );
}
