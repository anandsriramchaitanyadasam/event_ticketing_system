// Importing necessary libraries and components
import React, { useEffect, useState } from "react"; // React library and hooks
import { getApihandler } from "../../Apihandler"; // API handler for fetching data
import Header from "../../layout/header"; // Header component
import {
  Paper, // Material UI Paper component
  Table, // Material UI Table component
  TableBody, // Material UI TableBody for table rows
  TableCell, // Material UI TableCell for individual cells
  TableContainer, // Material UI TableContainer for wrapping the table
  TableHead, // Material UI TableHead for header row
  TableRow, // Material UI TableRow for individual rows
} from "@mui/material"; // Importing MUI components for table layout

export default function Booking() {
  // State hooks to manage role and data
  const [role, setRole] = useState(""); // Stores the role (user/vendor)
  const [data, setData] = useState([]); // Stores the booking or event data

  // Logging data for debugging
  console.log("data is ---->", data);

  // Effect hook to check the role from localStorage and fetch data based on the role
  useEffect(() => {
    const check = localStorage.getItem("role"); // Getting role from localStorage
    if (check) {
      setRole(check); // Set the role if found
    }

    // Conditional API call based on the role
    if (check === "user") {
      getUserBookings(); // Fetch user bookings
    } else if (check === "vendor") {
      getVendorBookings(); // Fetch vendor bookings
    }
  }, []);

  // Function to fetch bookings for a user
  const getUserBookings = async () => {
    const userData = JSON.parse(localStorage.getItem("userData")); // Get user data from localStorage
    const userId = userData._id; // Extract user ID
    const res = await getApihandler(`/getUserBookings/${userId}`); // Fetch user bookings using API
    console.log("get user res is --->", res); // Log the response for debugging
    if (res.status === 200) {
      setData(res.data); // Set the fetched data if response is successful
    }
  };

  // Function to fetch bookings for a vendor
  const getVendorBookings = async () => {
    const userData = JSON.parse(localStorage.getItem("userData")); // Get vendor data from localStorage
    const vendorId = userData._id; // Extract vendor ID
    const res = await getApihandler(`/getVendorEvents/${vendorId}`); // Fetch vendor events using API
    if (res.status === 200) {
      setData(res.data); // Set the fetched data if response is successful
    }
  };

  return (
    <>
      <Header /> {/* Display the header */}

      {/* Conditional rendering based on the role */}
      {role === "user" ? (
        // Render user booking details in a table
        <div className="container">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                {/* Table Header for user bookings */}
                <TableRow>
                  <TableCell>Card Holder Name</TableCell>
                  <TableCell>Card Number</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Ticket Type</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Payment Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Table Body for displaying user booking details */}
                {data.map((booking) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }} // Remove border for the last row
                  >
                    {/* Render booking details in table cells */}
                    <TableCell component="th" scope="row">
                      {booking.cardDetails?.cardHolderName || "N/A"} {/* Card Holder Name */}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {booking.cardDetails?.cardNumber || "N/A"} {/* Card Number */}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {booking.quantity} {/* Ticket Quantity */}
                    </TableCell>
                    <TableCell>{booking.ticketType}</TableCell> {/* Ticket Type */}
                    <TableCell>{booking.total_price}</TableCell> {/* Total Price */}
                    <TableCell>{booking.paymentStatus}</TableCell> {/* Payment Status */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        // Render vendor event details in a table
        <div className="container">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                {/* Table Header for vendor events */}
                <TableRow>
                  <TableCell>Event Name</TableCell>
                  <TableCell>Event Address</TableCell>
                  <TableCell>Event Date</TableCell>
                  <TableCell>Event Start Time</TableCell>
                  <TableCell>Event End Time</TableCell>
                  <TableCell>Standard Price</TableCell>
                  <TableCell>VIP Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Table Body for displaying vendor event details */}
                {data.map((booking) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }} // Remove border for the last row
                  >
                    {/* Render event details in table cells */}
                    <TableCell component="th" scope="row">
                      {booking.event_name || "N/A"} {/* Event Name */}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {`${booking.country}, ${booking.state}, ${booking.city}, ${
                        booking.event_address || "N/A"
                      }`} {/* Event Address */}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(booking.event_date).toLocaleDateString() || "N/A"} {/* Event Date */}
                    </TableCell>
                    <TableCell>{booking.event_start_time}</TableCell> {/* Event Start Time */}
                    <TableCell>{booking.event_end_time}</TableCell> {/* Event End Time */}
                    <TableCell>{booking.standard_price}</TableCell> {/* Standard Price */}
                    <TableCell>{booking.vip_price}</TableCell> {/* VIP Price */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
}
