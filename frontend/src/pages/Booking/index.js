import React, { useEffect, useState } from "react";
import { getApihandler } from "../../Apihandler";
import Header from "../../layout/header";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function Booking() {
  const [role, setRole] = useState("");
  const [data, setData] = useState([]);
  console.log("data is ---->", data);
  useEffect(() => {
    const check = localStorage.getItem("role");
    if (check) {
      setRole(check);
    }
    if (check === "user") {
      getUserBookings();
    } else if (check === "vendor") {
      getVendorBookings();
    }
  }, []);
  const getUserBookings = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;
    const res = await getApihandler(`/getUserBookings/${userId}`);
    console.log("get user res is --->", res);
    if (res.status === 200) {
      setData(res.data);
    }
  };

  const getVendorBookings = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const vendorId = userData._id;

    const res = await getApihandler(`/getVendorEvents/${vendorId}`);
    if (res.status === 200) {
      setData(res.data);
    }
  };
  return (
    <>
      <Header />

      {role === "user" ? (
        <div className="container">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
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
                {data.map((booking) => (
                  <TableRow
                    // key={booking.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {booking.cardDetails?.cardHolderName || "N/A"}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {booking.cardDetails?.cardNumber || "N/A"}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {booking.quantity}
                    </TableCell>
                    <TableCell>{booking.ticketType}</TableCell>
                    <TableCell>{booking.total_price}</TableCell>
                    <TableCell>{booking.paymentStatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div className="container">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Event Name</TableCell>
                  <TableCell>Event address</TableCell>

                  <TableCell>Event date</TableCell>
                  <TableCell>Event start time</TableCell>
                  <TableCell>Event end time</TableCell>
                  <TableCell>Standard Price</TableCell>
                  <TableCell> VIP Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((booking) => (
                  <TableRow
                    // key={booking.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {booking.event_name || "N/A"}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {`${booking.country}, ${booking.state}, ${
                        booking.city
                      }, ${booking.event_address || "N/A"}`}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(booking.event_date).toLocaleDateString() ||
                        "N/A"}
                    </TableCell>
                    <TableCell>{booking.event_start_time}</TableCell>
                    <TableCell>{booking.event_end_time}</TableCell>
                    <TableCell>{booking.standard_price}</TableCell>
                    <TableCell>{booking.vip_price}</TableCell>
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
