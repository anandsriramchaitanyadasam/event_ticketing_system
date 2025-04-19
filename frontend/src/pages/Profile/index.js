<<<<<<< HEAD
/** @format */

import React, { useEffect, useState } from "react";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import { Button, TextField, Box } from "@mui/material";
import Swal from "sweetalert2";
import { putApihandler } from "../../Apihandler";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countrycode, setCountryCode] = useState("");
  const [mobileno, setMobileNumber] = useState("");
  const [userId, setUserId] = useState(null);
  const [isVendor, setIsVendor] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    const role = localStorage.getItem("role");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
      setUserId(parsedUser._id);

      // Check if user is vendor or regular user
      setIsVendor(role === "vendor");

      // Set fields based on user type
      if (role === "vendor") {
        setName(parsedUser.vendor_Name || "");
        setEmail(parsedUser.vendor_Email || "");
      } else {
        setName(parsedUser.user_Name || "");
        setEmail(parsedUser.user_Email || "");
      }
      setCountryCode(parsedUser.country_code || "");
      setMobileNumber(parsedUser.mobile_no || "");
    }
  }, []);

  const handleUpdateUser = async () => {
    const item = isVendor
      ? {
          vendor_Name: name,
          vendor_Email: email,
          country_code: countrycode,
          mobile_no: mobileno,
        }
      : {
          user_Name: name,
          user_Email: email,
          country_code: countrycode,
          mobile_no: mobileno,
        };

    const endpoint = isVendor
      ? `/editVendor/${userId}`
      : `/admin/editUser/${userId}`;

    const res = await putApihandler(endpoint, item);

    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        text: "Profile updated successfully!",
      });
      setEditMode(false);

      const updatedUser = { ...userData, ...item };
      setUserData(updatedUser);
      localStorage.setItem("userData", JSON.stringify(updatedUser));
    } else {
      Swal.fire({
        icon: "error",
        text: "Failed to update profile!",
      });
    }
  };

  return (
    <>
      <Header />

      {userData ? (
        <div className="text-center mb-5" style={{ padding: "30px" }}>
          {editMode ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
              maxWidth="400px"
              margin="auto"
            >
              <h3>{isVendor ? "Edit Vendor Profile" : "Edit User Profile"}</h3>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <TextField
                label="Country Code"
                value={countrycode}
                onChange={(e) => setCountryCode(e.target.value)}
                fullWidth
              />
              <TextField
                label="Mobile Number"
                value={mobileno}
                onChange={(e) => setMobileNumber(e.target.value)}
                fullWidth
              />
              <Box display="flex" justifyContent="center" gap={2} mt={2}>
                <Button variant="contained" onClick={handleUpdateUser}>
                  Save
                </Button>
                <Button variant="outlined" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
              maxWidth="400px"
              margin="auto"
            >
              <h3>{isVendor ? "Vendor Profile" : "User Profile"}</h3>
              <div className="text-center mb-5" style={{ padding: "30px" }}>
                <p>
                  <strong>Name:</strong>{" "}
                  {isVendor ? userData.vendor_Name : userData.user_Name}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {isVendor ? userData.vendor_Email : userData.user_Email}
                </p>
                <p>
                  <strong>Mobile:</strong> {userData.mobile_no}
                </p>
                <p>
                  <strong>Country Code:</strong> {userData.country_code}
                </p>
              </div>
              <Button
                variant="contained"
                onClick={() => setEditMode(true)}
                sx={{ mt: 2 }}
              >
                Edit Profile
              </Button>
            </Box>
          )}
        </div>
      ) : (
        <div className="text-center">Loading user data...</div>
      )}
      <Footer />
=======
import React, { useEffect, useState } from "react";
import Header from "../../layout/header";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  console.log("userdata is ---->", userData);
  useEffect(() => {
    // Get data from localStorage
    const storedUser = localStorage.getItem("userData");

    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);
  return (
    <>
      <Header />
      <h4 className="text-center mt-5">User Profile</h4>
      {userData ? (
        <div className="text-center mb-5" style={{ padding: "30px" }}>
          <p>
            <strong>Name:</strong> {userData.user_FullName}
          </p>
          <p>
            <strong>Email:</strong> {userData.user_Email}
          </p>
          <p>
            <strong>Mobile:</strong> {userData.mobile_no}
          </p>
          <p>
            <strong>Country Code:</strong> {userData.country_code}
          </p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
    </>
  );
}
