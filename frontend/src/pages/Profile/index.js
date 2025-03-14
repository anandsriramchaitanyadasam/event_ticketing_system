/** @format */

import React, { useEffect, useState } from "react";
import Header from "../../layout/header";
import Footer from "../../layout/footer";

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
            <strong>Name:</strong> {userData.user_Name}
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
      <Footer />
    </>
  );
}
