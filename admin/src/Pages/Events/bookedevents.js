import { useEffect, useState } from "react";
import { getApihandler } from "../../Apihandler";
import AdminLayout from "../../Layout/AdminLayout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function BookedEvents() {
  const [data, setData] = useState([]);
  console.log("data is --->", data);
  useEffect(() => {
    getBookedEvents();
  }, []);
  const getBookedEvents = async () => {
    const res = await getApihandler("/getAllBookedEvents");
    if (res.status === 200) {
      setData(res.data);
    }
  };
  return (
    <AdminLayout>
      <h4>Booked Events</h4>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Standard Price</TableCell>
              <TableCell>VIP Price</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Ticket Type</TableCell>
              <TableCell>Paymnet Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((booking) => (
              <TableRow
                key={booking.event_name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {booking.event_name}
                </TableCell>
                <TableCell>{booking.quantity}</TableCell>
                <TableCell>{booking.standard_price}</TableCell>
                <TableCell>{booking.vip_price}</TableCell>
                <TableCell>{booking.user_name}</TableCell>

                <TableCell>{booking.ticketType}</TableCell>
                <TableCell>{booking.paymentStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
}
