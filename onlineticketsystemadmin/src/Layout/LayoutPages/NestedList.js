/** @format */

import * as React from "react";
import { IconButton } from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import PaymentIcon from '@mui/icons-material/Payment';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
export default function NestedList() {
  const [bookingOpen, setBookingOpen] = React.useState(true);
  const [withdrawalOpen, setWithdrawalOpen] = React.useState(true);

  const bookingHandle = () => {
    setBookingOpen(!bookingOpen);
  };
  const withdrawHandle = () => {
    setWithdrawalOpen(!withdrawalOpen);
  };
  // *************** for collapse dropdown ******************
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };
  const handleClick4 = () => {
    setOpen4(!open4);
  };
  const handleClick5 = () => {
    setOpen5(!open5);
  };
  const handleClick6 = () => {
    setOpen6(!open6);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, backgroundColor: "#348ef6" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     Nested List Items
      //   </ListSubheader>
      // }
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
      {/* <Link to="/dashboard" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <PrecisionManufacturingOutlinedIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Mechanic" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <PaymentIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Withdrawl Request" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <CastForEducationIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Earnings" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <DashboardIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Disputes" sx={{ color: "white" }} />
        </ListItemButton>
      </Link> */}
      {/* <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <PeopleIcon
            sx={{ color: "#2275fc", marginLeft: "8px", fill: "white" }}
          />
        </ListItemIcon>
        <ListItemText primary="Users" sx={{ color: "white" }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/addproduct">
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Add Product" />
            </ListItemButton>
          </Link>
        </List>
        <List component="div" disablePadding>
          <Link to="/productlist">
            <ListItemButton sx={{ textAlign: "center" }}>
             
              <ListItemText className="sideNav-tab" primary="Product List" />
            </ListItemButton>
          </Link>
        </List>
        <List component="div" disablePadding>
          <Link to="/newarrival">
            <ListItemButton sx={{ textAlign: "center" }}>
            
              <ListItemText className="sideNav-tab" primary="New Arrival" />
            </ListItemButton>
          </Link>
        </List>
        <List component="div" disablePadding>
          <Link to="/bestseller">
            <ListItemButton sx={{ textAlign: "center" }}>
             
              <ListItemText className="sideNav-tab" primary="Best Seller" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClick1}>
        <IconButton>
          <CategoryIcon sx={{ fill: "white" }} />
        </IconButton>
        <ListItemText
          primary="Mechanic"
          sx={{ paddingLeft: "12px", color: "white" }}
        />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/categorylist">
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Category List" />
            </ListItemButton>
          </Link>
        </List>
        <List component="div" disablePadding>
          <Link to="/newcategory">
            <ListItemButton sx={{ textAlign: "center" }}>
            
              <ListItemText className="sideNav-tab" primary="Add Category" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClick3}>
        <IconButton>
          <PaletteIcon sx={{ fill: "white" }} />
        </IconButton>
        <ListItemText
          primary="Withdrawl Request"
          sx={{ paddingLeft: "12px", color: "white" }}
        />
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/getcolor">
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Colour List" />
            </ListItemButton>
          </Link>
        </List>
        <List component="div" disablePadding>
          <Link to="/addcolor">
            <ListItemButton sx={{ textAlign: "center" }}>
            
              <ListItemText className="sideNav-tab" primary="Add Colour" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClick5}>
        <IconButton>
          <StyleIcon sx={{ fill: "white" }} />
        </IconButton>
        <ListItemText primary="Earnings" sx={{ paddingLeft: "12px", color:"white" }} />
        {open5 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open5} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/bottom-style-list">
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Bottom Style List" />
            </ListItemButton>
          </Link>
        </List>
        <List component="div" disablePadding>
          <Link to="/add-bottom-style">
            <ListItemButton sx={{ textAlign: "center" }}>
             
              <ListItemText
                className="sideNav-tab"
                primary="Add Bottom Style"
              />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClick6}>
        <IconButton>
          <BorderColorIcon sx={{ fill: "white" }} />
        </IconButton>
        <ListItemText primary="Disputes" sx={{ paddingLeft: "12px", color:"white" }} />
        {open6 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open6} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/fabric-list">
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Fabric List" />
            </ListItemButton>
          </Link>
        </List>
        <List component="div" disablePadding>
          <Link to="/add-fabric">
            <ListItemButton sx={{ textAlign: "center" }}>
           
              <ListItemText className="sideNav-tab" primary="Add Fabric" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse> */}
    </List>
  );
}
