import { useEffect, useState } from "react";              // React hooks for side effects & state
import { getApihandler } from "../../Apihandler";        // API helper for GET requests
import AdminLayout from "../../Layout/AdminLayout";      // Wraps page in admin dashboard layout
// MUI components for table display and pagination
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

export default function BookedEvents() {
  // State for the full list of booked events
  const [data, setData] = useState([]);
  // State for current table page (zero‑based)
  const [page, setPage] = useState(0);
  // State for number of rows per page; default is 5
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch booked events once on component mount
  useEffect(() => {
    getBookedEvents();
  }, []);

  // Retrieves all booked events and sorts them by creation date (newest first)
  const getBookedEvents = async () => {
    const res = await getApihandler("/getAllBookedEvents");
    if (res.status === 200) {
      const sortedData = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setData(sortedData);
    }
  };

  // Handler when the user changes the page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handler when the user changes rows per page; resets to first page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <AdminLayout>
      <h4>Booked Events</h4>

      {/* Table container with pagination controls at the bottom */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="booked events table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Event Name</strong></TableCell>
              <TableCell><strong>Quantity</strong></TableCell>
              <TableCell><strong>User Name</strong></TableCell>
              <TableCell><strong>Ticket Type</strong></TableCell>
              <TableCell><strong>Payment Status</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Slice data array to show only the rows for the current page */}
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((booking) => (
                <TableRow
                  key={booking._id}  // Use unique identifier for React key
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

        {/* Pagination controls */}
        <TablePagination
          component="div"
          count={data.length}                  // Total number of rows
          page={page}                          // Current page
          onPageChange={handleChangePage}      // Page change handler
          rowsPerPage={rowsPerPage}            // Rows per page
          onRowsPerPageChange={handleChangeRowsPerPage}  // Rows‑per‑page handler
          rowsPerPageOptions={[5, 10, 25]}     // Options for rows per page
        />
      </TableContainer>
    </AdminLayout>
  );
}
