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
import TablePagination from "@mui/material/TablePagination";

export default function BookedEvents() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // You can change this default rows per page

  useEffect(() => {
    getBookedEvents();
  }, []);

  const getBookedEvents = async () => {
    const res = await getApihandler("/getAllBookedEvents");
    if (res.status === 200) {
      // Sort data so the latest event comes first
      const sortedData = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setData(sortedData);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
              <TableCell>User Name</TableCell>
              <TableCell>Ticket Type</TableCell>
              <TableCell>Payment Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((booking) => (
                <TableRow
                  key={booking._id} // assuming you have _id or unique ID
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {booking.event_name}
                  </TableCell>
                  <TableCell>{booking.quantity}</TableCell>
                  <TableCell>{booking.user_name}</TableCell>
                  <TableCell>{booking.ticketType}</TableCell>
                  <TableCell>{booking.paymentStatus}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </AdminLayout>
  );
}
