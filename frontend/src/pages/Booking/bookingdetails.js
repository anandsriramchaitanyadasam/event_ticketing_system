import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getApihandler } from "../../Apihandler";
import Header from "../../layout/header";
import Footer from "../../layout/footer";

export default function BookingDetails() {
  const { id } = useParams();
  const [ticketData, setTicketData] = useState(null);
  const ticketRef = useRef();

  useEffect(() => {
    getBookingDetails();
  }, []);

  const getBookingDetails = async () => {
    try {
      const res = await getApihandler(`/getUsersBookingByBookingId/${id}`);
      console.log("Booking Details API Response:", res);
      if (res.status === 200 && res.data) {
        setTicketData(res.data);
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  const handleDownload = () => {
    if (ticketRef.current) {
      html2canvas(ticketRef.current, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("ticket.pdf");
      });
    }
  };

  if (!ticketData) {
    return <div>Loading Ticket...</div>;
  }

  const {
    event = {},
    user = {},
    quantity,
    ticketType,
    total_price,
    paymentStatus,
    cardDetails = {},
    createdAt,
  } = ticketData;

  return (
    <>
      <Header />
      <div className="container" style={{ padding: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownload}
          style={{ marginBottom: "20px" }}
        >
          Download Ticket
        </Button>

        <Card ref={ticketRef} sx={{ padding: 3, boxShadow: 5 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {event.event_name || "Event Name Not Available"}
            </Typography>

            <Divider sx={{ marginBottom: 2 }} />

            <Typography variant="subtitle1" color="textSecondary">
              <strong>Date:</strong>{" "}
              {event.event_date
                ? new Date(event.event_date).toLocaleDateString()
                : "N/A"}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <strong>Time:</strong> {event.event_start_time || "N/A"} -{" "}
              {event.event_end_time || "N/A"}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <strong>Location:</strong>{" "}
              {`${event.event_address || ""}, ${event.city || ""}, ${
                event.state || ""
              }, ${event.country || ""}`}
            </Typography>

            <Divider sx={{ marginY: 2 }} />

            <Typography variant="h6">Ticket Information</Typography>
            <Typography>
              <strong>Ticket Type:</strong> {ticketType || "N/A"}
            </Typography>
            <Typography>
              <strong>Quantity:</strong> {quantity || 0}
            </Typography>
            <Typography>
              <strong>Total Price:</strong> ₹{total_price || 0}
            </Typography>
            <Typography>
              <strong>Payment Status:</strong> {paymentStatus || "N/A"}
            </Typography>

            <Divider sx={{ marginY: 2 }} />

            <Typography variant="h6">Card Details</Typography>
            <Typography>
              <strong>Card Holder:</strong>{" "}
              {cardDetails.cardHolderName || "N/A"}
            </Typography>
            <Typography>
              <strong>Card Number:</strong>
              {cardDetails.cardNumber || " N/A"}
            </Typography>
            <Typography>
              <strong>Expiry:</strong>
              {cardDetails.expiryMonth && cardDetails.expiryYear
                ? ` ${cardDetails.expiryMonth}/${cardDetails.expiryYear}`
                : "N/A"}
            </Typography>

            <Divider sx={{ marginY: 2 }} />
            <Typography variant="h6" gutterBottom>
              User Details
            </Typography>
            <Typography variant="body2">
              <strong>User Name:</strong> {user.name || "N/A"}
            </Typography>

            <Typography variant="caption" color="textSecondary">
              Ticket booked on:{" "}
              {createdAt ? new Date(createdAt).toLocaleString() : "N/A"}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
