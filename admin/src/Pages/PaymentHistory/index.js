import { useState, useEffect } from "react";
import { getApihandler } from "../../Apihandler";
import AdminLayout from "../../Layout/AdminLayout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function PaymentHistory() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getPaymentHistory();
  }, []);
  const getPaymentHistory = async () => {
    const res = await getApihandler("/getAllPaymentsDetails");

    if (res.status === 200) {
      setData(res.data);
    }
  };
  return (
    <AdminLayout>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>User Name</strong>
              </TableCell>
              <TableCell>
                <strong>Event Name</strong>
              </TableCell>
              <TableCell>
                <strong>Ticket Type</strong>
              </TableCell>
              <TableCell>
                <strong>Quantity</strong>
              </TableCell>
              <TableCell>
                <strong>Total Price (₹)</strong>
              </TableCell>
              <TableCell>
                <strong>Payment Status</strong>
              </TableCell>
              <TableCell>
                <strong>Payment Date</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((payment, index) => (
              <TableRow
                key={payment.bookingId || index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {payment.user?.name || "N/A"}
                </TableCell>
                <TableCell>{payment.event?.Event_name || "N/A"}</TableCell>
                <TableCell>
                  {payment.ticketType?.toUpperCase() || "N/A"}
                </TableCell>
                <TableCell>{payment.quantity}</TableCell>
                <TableCell>₹{payment.totalPrice}</TableCell>
                <TableCell>{payment.paymentStatus}</TableCell>
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
