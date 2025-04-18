import { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import { getApihandler } from "../../Apihandler";
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
  const [data, setData] = useState([]);
  useEffect(() => {
    getReviews();
  }, []);
  const getReviews = async () => {
    const res = await getApihandler("/getAllReviews");
    console.log("get review api res--->", res);
    if (res.status === 200) {
      setData(res.data);
    }
  };
  return (
    <AdminLayout>
      <h4>Reviews</h4>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Review</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Vendor Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((review) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {review.event_name}
                </TableCell>
                <TableCell>{review.rating}</TableCell>
                <TableCell>{review.review}</TableCell>
                <TableCell>{review.user_name}</TableCell>
                <TableCell>{review.vendor_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
}
