/** @format */

import React, { useEffect, useState } from "react";

import UserEvents from "../../components/Events/userevents";
import VendorEvents from "../../components/Events/vendorevents";

export default function Events() {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const vendorId = localStorage.getItem("vendor_Id");
    const userData = localStorage.getItem("userData");

    if (vendorId) {
      setUserType("vendor");
    } else if (userData) {
      setUserType("user");
    } else {
      setUserType(null); // Handle case when neither is logged in
    }
  }, []);

  return (
    <>
      {userType === "vendor" ? (
        <VendorEvents />
      ) : userType === "user" ? (
        <UserEvents />
      ) : (
        <p style={{ textAlign: "center", margin: "20px" }}>
          Please log in to view events.
        </p>
      )}
    </>
  );
}
