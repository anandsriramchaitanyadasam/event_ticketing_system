/** @format */

import React, { useEffect, useState } from "react";
import Header from "../../layout/header";
import Footer from "../../layout/footer";

export default function VendorProfile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get data from localStorage
    const storedUser = localStorage.getItem("vendor_Id");

    if (storedUser) {
      try {
        // Attempt to parse the data as JSON
        const parsedData = JSON.parse(storedUser);
        setUserData(parsedData);
      } catch (err) {
        // Handle JSON parsing error
        setError("Invalid data in localStorage. Please log in again.");
        console.error("Failed to parse user data:", err);
      }
    } else {
      setError("No vendor data found. Please log in.");
    }
  }, []);

  return (
    <>
      <Header />
      <h4 className="text-center mt-5">Vendor Profile</h4>
      {error ? (
        <p className="text-center text-danger">{error}</p>
      ) : userData ? (
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
        <p className="text-center">Loading profile...</p>
      )}
      <Footer />
    </>
  );
}
