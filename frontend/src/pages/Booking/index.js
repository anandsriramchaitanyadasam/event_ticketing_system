import React, { useEffect, useState } from "react";
import { getApihandler, postApihandler } from "../../Apihandler";
import Header from "../../layout/header";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import Swal from "sweetalert2";
import swal from "sweetalert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Booking() {
  const [open, setOpen] = React.useState(false);
  const [selectedEventId, setSelectedEventId] = useState();
  const handleOpen = (eventId) => {
    setSelectedEventId(eventId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEventId(null);
  };
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

    const res = await getApihandler(`/getBookedEventsByVendor/${vendorId}`);
    if (res.status === 200) {
      setData(res.data);
    }
  };

  // ********* submit review api **********
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const userData = JSON.parse(localStorage.getItem("userData"));
  const userid = userData._id;

  const handleSubmit = async () => {
    const data = {
      userId: userid,
      eventId: selectedEventId,
      rating: rating,
      review: reviewText,
    };
    const res = await postApihandler("/submitReview", data);
    console.log("Review submitted:", res);
    if (res.status === 200) {
      Swal.fire({
        title: "Review Submitted successfully",
        icon: "success",
      });
    } else {
      swal(
        "Error",
        res.error.response.data.message || "An unknown error occurred.",
        "error"
      );
    }
    setOpen(false);
  };

  return (
    <>
      <Header />

      {role === "user" ? (
        <div className="container">
          <Grid container spacing={3}>
            {data.map((booking, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {booking.event?.event_name || "Event Name Not Available"}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      📍{" "}
                      {`${booking.event?.country}, ${booking.event?.state}, ${
                        booking.event?.city
                      }, ${booking.event?.event_address || "Address N/A"}`}
                    </Typography>

                    <Typography variant="body2" mt={2}>
                      🎟️ <strong>Ticket Type:</strong> {booking.ticketType}
                    </Typography>

                    <Typography variant="body2">
                      🔢 <strong>Quantity:</strong> {booking.quantity}
                    </Typography>

                    <Typography variant="body2">
                      💵 <strong>Total Price:</strong> ₹{booking.total_price}
                    </Typography>

                    <Typography
                      variant="body2"
                      color={booking.paymentStatus === "Paid" ? "green" : "red"}
                      fontWeight="bold"
                      mt={1}
                    >
                      {booking.paymentStatus}
                    </Typography>
                    <Link
                      to={`/bookingdetails/${booking._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          marginTop: "20px",
                          backgroundColor: "#60156d",
                          color: "white",
                        }}
                      >
                        View
                      </Button>
                    </Link>
                    <Button
                      startIcon={<StarIcon sx={{ color: "orange" }} />}
                      sx={{
                        marginTop: "20px",
                        backgroundColor: "#60156d",
                        color: "white",
                        marginLeft: "20px",
                      }}
                      onClick={() => handleOpen(booking.event?._id)}
                    >
                      Review & Ratings
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <div className="container">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell>Event Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Ticket Type</TableCell>
                  <TableCell>Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((booking) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {booking.user_name || "N/A"}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {booking.event_name || "N/A"}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {booking.quantity || "N/A"}
                    </TableCell>
                    <TableCell>{booking.ticketType}</TableCell>
                    <TableCell>{booking.total_price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            Submit Your Review
          </Typography>

          <Typography component="legend" mb={1}>
            Rating
          </Typography>
          <Rating
            name="event-rating"
            precision={0.5}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Write your review"
            variant="outlined"
            sx={{ mt: 2 }}
            onChange={(e) => setReviewText(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            Submit Review
          </Button>
        </Box>
      </Modal>
    </>
  );
}
