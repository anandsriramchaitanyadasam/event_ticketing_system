/** @format */

import * as React from "react";
import { IconButton } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { Link, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ForestIcon from "@mui/icons-material/Forest";
import StyleIcon from "@mui/icons-material/Style";
import PaymentsIcon from "@mui/icons-material/Payments";
import ReviewsIcon from "@mui/icons-material/Reviews";
import LogoutIcon from "@mui/icons-material/Logout";
export default function NestedList() {
  // ******* logout functionality *****
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("userId");
    navigate("/login");
  };
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, backgroundColor: "#60156d" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <DashboardIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/users" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <PeopleIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Users" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/vendors" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <ForestIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Vendors" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/category" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <StyleIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Category" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/events" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <EventSeatIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Events" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/bookedevents" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <EventSeatIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary=" Booked Events" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/paymenthistory" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <PaymentsIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Payment History" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/reviews" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <ReviewsIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Reviews" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <IconButton onClick={handleLogout}>
            <LogoutIcon sx={{ fill: "white" }} />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary="Logout" sx={{ color: "white" }} />
      </ListItemButton>
    </List>
  );
}
