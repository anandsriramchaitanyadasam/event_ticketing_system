import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
} from "@mui/material";
export default function Header() {
  return (
    <div>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#348ef6", color: "black", boxShadow: "none",paddingTop:"10px", paddingBottom:"10px"}}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{fontWeight:"700",color:"white",marginLeft:"20px"}}>Event Management</Typography>
          <Box className="Header_tab" >
            <a
              href="#"
              style={{
                fontSize: "18px",
                fontWeight: "500",
                color: "white",
                textDecoration: "none",
              
                padding:"30px"
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
                padding:"30px"

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
                padding:"30px"

              }}
            >
              Contact
            </a>
          </Box>
          <Box sx={{marginRight:"20px"}}>
            <a href="/login" style={{textDecoration:"none"}}>
            <Button variant="outlined" sx={{ marginRight: 1 , borderRadius:"8px", border:"1px solid white", color:"white", fontWeight:"500"}}>
              Login
            </Button>
            </a>&nbsp;&nbsp;
            <a href="/" style={{textDecoration:"none"}}>
            <Button variant="contained" sx={{backgroundColor:"white", borderRadius:"8px",color:"#348ef6"}}>
              Sign Up
            </Button>
            </a>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
