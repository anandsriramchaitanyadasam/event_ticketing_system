import { useEffect, useState } from "react";         // React hooks for lifecycle & state
import AdminLayout from "../../Layout/AdminLayout";  // Layout wrapper for admin pages
import { getApihandler } from "../../Apihandler";    // API helper for GET requests
// MUI components for table display
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function Reviews() {
  // State to hold the list of reviews
  const [data, setData] = useState([]);

  // On component mount, fetch all reviews
  useEffect(() => {
    getReviews();
  }, []);

  // Fetch reviews from the backend and store in state
  const getReviews = async () => {
    const res = await getApihandler("/getAllReviews");
    console.log("get review api res--->", res);
    if (res.status === 200) {
      setData(res.data);
    }
  };

  return (
    // Wrap content in the admin dashboard layout
    <AdminLayout>
      <h4>Reviews</h4>
      {/* Table container */}
      <TableContainer component={Paper}>
        {/* Main table */}
        <Table sx={{ minWidth: 650 }} aria-label="reviews table">
          <TableHead>
            <TableRow>
              {/* Table headers */}
              <TableCell><strong>Event Name</strong></TableCell>
              <TableCell><strong>Rating</strong></TableCell>
              <TableCell><strong>Review</strong></TableCell>
              <TableCell><strong>User Name</strong></TableCell>
              <TableCell><strong>Vendor Name</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Map over each review and render a row */}
            {data.map((review, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* Event name cell */}
                <TableCell component="th" scope="row">
                  {review.event_name}
                </TableCell>
                {/* Rating cell */}
                <TableCell>{review.rating}</TableCell>
                {/* Review text cell */}
                <TableCell>{review.review}</TableCell>
                {/* User name cell */}
                <TableCell>{review.user_name}</TableCell>
                {/* Vendor name cell */}
                <TableCell>{review.vendor_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
}
