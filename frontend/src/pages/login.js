/** @format */

// Importing necessary modules and components
import React, { useState } from "react";
import { Box, Button, Grid, IconButton, Tab, Typography } from "@mui/material";
import Header from "../layout/header";
import { useNavigate } from "react-router-dom";
import { postApihandler } from "../Apihandler";
import swal from "sweetalert";

// MUI lab components for tab handling
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Icons for password visibility toggle
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  // State to manage the current tab (User/Vendor)
  const [value, setValue] = React.useState("1");

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Tab switch handler
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // States for User login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // User login handler
  const userLogin = async (e) => {
    e.preventDefault();
    const data = {
      user_Email: email,
      password: password,
    };

    const res = await postApihandler("/userLogin", data);

    if (res.status === 200) {
      localStorage.setItem("userData", JSON.stringify(res.data));
      localStorage.setItem("role", "user");
      swal(" Login Successfully");
      navigate("/home");
    } else {
      swal("Error", res.message || "An unknown error occurred.", "error");
    }
  };

  // States for Vendor login form
  const [vendoremail, setVendorEmail] = useState("");
  const [vendorpassword, setVendorPassword] = useState("");

  // Vendor login handler
  const vendorLogin = async (e) => {
    e.preventDefault();
    const data = {
      vendor_Email: vendoremail,
      password: vendorpassword,
    };
    const res = await postApihandler("/vendorLogin", data);

    if (res.status === 200) {
      localStorage.setItem("userData", JSON.stringify(res.data));
      localStorage.setItem("vendor_Id", res.data._id);
      localStorage.setItem("role", "vendor");
      swal(" Login Vendor Successfully");
      navigate("/home");
    } else {
      swal("Error", res.message || "An unknown error occurred.", "error");
    }
  };

  return (
    <div>
      {/* Header component */}
      <Header />

      {/* Login section */}
      <section className="signup_banner">
        <Grid container spacing={2} sx={{ padding: "30px" }}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                width: "100%",
                typography: "body1",
                padding: "0",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            >
              {/* Tab context for switching between User and Vendor login */}
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="User" value="1" />
                    <Tab label="Vendor" value="2" />
                  </TabList>
                </Box>

                {/* USER LOGIN FORM */}
                <TabPanel value="1">
                  <h6>user</h6>
                  <form
                    component="form"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: 2,
                      textAlign: "center",
                    }}
                    onSubmit={userLogin}
                  >
                    <div style={{ width: "100%" }}>
                      {/* Email Field */}
                      <div>
                        <Typography
                          sx={{ textAlign: "start", fontSize: "20px" }}
                        >
                          Email
                        </Typography>
                        <div>
                          <input
                            type="text"
                            placeholder="Enter your Email"
                            fullWidth
                            style={{
                              background: "#D9D9D929",
                              border: "2px solid #0000006E",
                              width: "100%",
                              height: "40px",
                              borderRadius: "10px",
                              fontSize: "14px",
                              fontWeight: "500",
                              marginBottom: "30px",
                              paddingLeft: "10px",
                            }}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                          />
                        </div>
                      </div>

                      {/* Password Field */}
                      <div>
                        <Typography
                          sx={{ textAlign: "start", fontSize: "20px" }}
                        >
                          Password
                        </Typography>
                        <div style={{ position: "relative", width: "100%" }}>
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            style={{
                              background: "#D9D9D929",
                              border: "2px solid #0000006E",
                              width: "100%",
                              height: "40px",
                              borderRadius: "10px",
                              fontSize: "14px",
                              fontWeight: "500",
                              marginBottom: "30px",
                              paddingLeft: "10px",
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                          />
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ position: "absolute", right: 0, top: 0 }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: "#60156d",
                          width: "240px",
                          borderRadius: "20px",
                          fontSize: "16px",
                        }}
                      >
                        Login
                      </Button>
                    </div>

                    {/* Sign Up link */}
                    <Typography
                      variant="body2"
                      textAlign="start"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        marginTop: "20px",
                        marginBottom: "60px",
                      }}
                    >
                      Don’t have an account?{" "}
                      <a
                        href="/"
                        style={{
                          textDecoration: "none",
                          color: "#60156d",
                          fontWeight: "600",
                        }}
                      >
                        Sign Up
                      </a>
                    </Typography>
                  </form>
                </TabPanel>

                {/* VENDOR LOGIN FORM */}
                <TabPanel value="2">
                  <h6>Vendor</h6>
                  <form
                    component="form"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: 2,
                      textAlign: "center",
                    }}
                    onSubmit={vendorLogin}
                  >
                    <div style={{ width: "100%" }}>
                      {/* Email Field */}
                      <div>
                        <Typography
                          sx={{ textAlign: "start", fontSize: "20px" }}
                        >
                          Email
                        </Typography>
                        <input
                          type="text"
                          placeholder="Enter your Email"
                          fullWidth
                          style={{
                            background: "#D9D9D929",
                            border: "2px solid #0000006E",
                            width: "100%",
                            height: "40px",
                            borderRadius: "10px",
                            fontSize: "14px",
                            fontWeight: "500",
                            marginBottom: "30px",
                            paddingLeft: "10px",
                          }}
                          onChange={(e) => setVendorEmail(e.target.value)}
                          value={vendoremail}
                        />
                      </div>

                      {/* Password Field */}
                      <div>
                        <Typography
                          sx={{ textAlign: "start", fontSize: "20px" }}
                        >
                          Password
                        </Typography>
                        <div style={{ position: "relative", width: "100%" }}>
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            style={{
                              background: "#D9D9D929",
                              border: "2px solid #0000006E",
                              width: "100%",
                              height: "40px",
                              borderRadius: "10px",
                              fontSize: "14px",
                              fontWeight: "500",
                              marginBottom: "30px",
                              paddingLeft: "10px",
                            }}
                            onChange={(e) =>
                              setVendorPassword(e.target.value)
                            }
                            value={vendorpassword}
                          />
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ position: "absolute", right: 0, top: 0 }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: "#60156d",
                          width: "240px",
                          borderRadius: "20px",
                          fontSize: "16px",
                        }}
                      >
                        Login
                      </Button>
                    </div>

                    {/* Sign Up link */}
                    <Typography
                      variant="body2"
                      textAlign="start"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        marginTop: "20px",
                        marginBottom: "60px",
                      }}
                    >
                      Don’t have an account?{" "}
                      <a
                        href="/"
                        style={{
                          textDecoration: "none",
                          color: "#60156d",
                          fontWeight: "600",
                        }}
                      >
                        Sign Up
                      </a>
                    </Typography>
                  </form>
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </section>
    </div>
  );
}
