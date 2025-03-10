import React, { useState } from "react";
import { Box, Button, Grid, Tab, Typography } from "@mui/material";
import signupimg from "../Images/signup.png";
import Header from "../layout/header";
import { useNavigate } from "react-router-dom";
import { postApihandler } from "../Apihandler";
import swal from "sweetalert";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
export default function Login() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userLogin = async (e) => {
    e.preventDefault();
    const data = {
      user_Email: email,
      password: password,
    };
    console.log("login data is --->", data);
    const res = await postApihandler("/userLogin", data);
    console.log("login api response is ---->", res);
    localStorage.setItem("userData", JSON.stringify(res.data));

    if (res.status === 200) {
      swal(" Login Successfully");
      // navigate("/home");
    }
    // console.log("login api response is ------->", res);
    else {
      swal("Error", res.message || "An unknown error occurred.", "error");
    }
  };

  // ************ vendor login ********
  const [vendoremail, setVendorEmail] = useState("");
  const [vendorpassword, setVendorPassword] = useState("");

  const vendorLogin = async (e) => {
    e.preventDefault();
    const data = {
      vendor_Email: vendoremail,
      password: vendorpassword,
    };
    const res = await postApihandler("/vendorLogin", data);
    if (res.status === 200) {
      swal(" Login Vendor Successfully");
      // navigate("/home");
    }
    // console.log("login api response is ------->", res);
    else {
      swal("Error", res.message || "An unknown error occurred.", "error");
    }
  };
  return (
    <div>
      <Header />
      <div style={{ padding: "30px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <div className="signupimg">
              <img src={signupimg} alt="Mechanic" style={{ width: "100%" }} />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
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
              <TabPanel value="1">
                <h6>user</h6>
                <form
                  component="form"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    // marginTop: "30px",
                    flexDirection: "column",
                    gap: 2,
                    textAlign: "center",
                  }}
                  onSubmit={userLogin}
                >
                  <div style={{ width: "100%" }}>
                    <div>
                      <Typography sx={{ textAlign: "start", fontSize: "20px" }}>
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
                    <div>
                      <Typography sx={{ textAlign: "start", fontSize: "20px" }}>
                        Password
                      </Typography>
                      <input
                        type="text"
                        placeholder="Enter your password"
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
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                  </div>

                  <div style={{}}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "#348ef6",
                        width: "240px",
                        borderRadius: "20px",
                        fontSize: "16px",
                      }}
                    >
                      Login
                    </Button>
                  </div>
                  <Typography
                    variant="body2"
                    textAlign="start"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      marginTop: "20px",
                    }}
                  >
                    Don’t have an account?{" "}
                    <a
                      href="/"
                      style={{
                        textDecoration: "none",
                        color: "#348ef6",
                        fontWeight: "600",
                      }}
                    >
                      Sign Up
                    </a>
                  </Typography>
                </form>
                <div>
                  <Button
                    variant="contained"
                    className="mt-3"
                    sx={{ padding: "5px 23px", backgroundColor: "#348ef6" }}
                  >
                    <GoogleIcon
                      sx={{
                        color: "white",
                        marginRight: "5px",
                      }}
                    />{" "}
                    Sign in with Google
                  </Button>
                  <Button
                    variant="contained"
                    className="mt-3"
                    sx={{ backgroundColor: "#348ef6" }}
                  >
                    <FacebookIcon sx={{ color: "white", marginRight: "5px" }} />{" "}
                    Sign in with Facebook
                  </Button>
                </div>
              </TabPanel>
              <TabPanel value="2">
                <h6>Vendor</h6>
                <form
                  component="form"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    // marginTop: "30px",
                    flexDirection: "column",
                    gap: 2,
                    textAlign: "center",
                  }}
                  onSubmit={vendorLogin}
                >
                  <div style={{ width: "100%" }}>
                    <div>
                      <Typography sx={{ textAlign: "start", fontSize: "20px" }}>
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
                    <div>
                      <Typography sx={{ textAlign: "start", fontSize: "20px" }}>
                        Password
                      </Typography>
                      <input
                        type="text"
                        placeholder="Enter your password"
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
                        onChange={(e) => setVendorPassword(e.target.value)}
                        value={vendorpassword}
                      />
                    </div>
                  </div>

                  <div style={{}}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "#348ef6",
                        width: "240px",
                        borderRadius: "20px",
                        fontSize: "16px",
                      }}
                    >
                      Login
                    </Button>
                  </div>
                  <Typography
                    variant="body2"
                    textAlign="start"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      marginTop: "20px",
                    }}
                  >
                    Don’t have an account?{" "}
                    <a
                      href="/"
                      style={{
                        textDecoration: "none",
                        color: "#348ef6",
                        fontWeight: "600",
                      }}
                    >
                      Sign Up
                    </a>
                  </Typography>
                </form>
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
