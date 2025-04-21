import { useState, useEffect } from "react";           // React hooks for state and side effects
import { getApihandler } from "../../Apihandler";      // API helper for GET requests
import AdminLayout from "../../Layout/AdminLayout";    // Layout wrapper for admin pages
// MUI components for table display
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function PaymentHistory() {
  // State to hold the list of payment records
  const [data, setData] = useState([]);

  // On component mount, fetch payment history
  useEffect(() => {
    getPaymentHistory();
  }, []);

  // Fetch all payment details from the server
  const getPaymentHistory = async () => {
    const res = await getApihandler("/getAllPaymentsDetails");
    if (res.status === 200) {
      setData(res.data);   // Store fetched data in state
    }
  };

  return (
    // Wrap table in the admin dashboard layout
    <AdminLayout>
      <TableContainer component={Paper}>
        {/* Main table */}
        <Table sx={{ minWidth: 650 }} aria-label="payment history table">
          <TableHead>
            <TableRow>
              <TableCell><strong>User Name</strong></TableCell>
              <TableCell><strong>Event Name</strong></TableCell>
              <TableCell><strong>Ticket Type</strong></TableCell>
              <TableCell><strong>Quantity</strong></TableCell>
              <TableCell><strong>Total Price (₹)</strong></TableCell>
              <TableCell><strong>Payment Status</strong></TableCell>
              <TableCell><strong>Payment Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Render each payment record as a table row */}
            {data?.map((payment, index) => (
              <TableRow
                key={payment.bookingId || index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* User name, fallback to "N/A" if missing */}
                <TableCell component="th" scope="row">
                  {payment.user?.name || "N/A"}
                </TableCell>
                {/* Event name */}
                <TableCell>
                  {payment.event?.Event_name || "N/A"}
                </TableCell>
                {/* Ticket type in uppercase */}
                <TableCell>
                  {payment.ticketType?.toUpperCase() || "N/A"}
                </TableCell>
                {/* Quantity of tickets */}
                <TableCell>{payment.quantity}</TableCell>
                {/* Total price with currency symbol */}
                <TableCell>₹{payment.totalPrice}</TableCell>
                {/* Payment status (e.g. "Completed", "Pending") */}
                <TableCell>{payment.paymentStatus}</TableCell>
                {/* Format event date to local date string */}
                <TableCell>
                  {new Date(payment.event?.date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
}
