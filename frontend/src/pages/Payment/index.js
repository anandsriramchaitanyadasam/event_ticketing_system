import React, { useState } from "react";
import Header from "../../layout/header";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { postApihandler } from "../../Apihandler";
import swal from "sweetalert";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function Payment() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      bookingId: id,
      cardDetails: {
        cardNumber: cardNumber,
        expiryMonth: expiryMonth,
        expiryYear: expiryYear,
        cardHolderName: cardHolderName,
      },
    };
    console.log("payment data", paymentData);

    const res = await postApihandler("/processPayment", paymentData);
    console.log("payment api res is --->", res);
    if (res.status === 200) {
      swal({
        icon: "success",
        title: "payment submit successfully",
      });
      navigate("/booking");
    } else {
      swal(
        "Error",
        res.error.response.data.message || "An unknown error occurred.",
        "error"
      );
    }
  };

  return (
    <>
      <Header />
      <Card
        sx={{ padding: 3, maxWidth: 400, margin: "auto", mt: 5, boxShadow: 3 }}
      >
        <Typography variant="h5" gutterBottom>
          Enter Payment Details
        </Typography>

        <form onSubmit={handleSubmit}>
          <input
            fullWidth
            placeholder="Card Number"
            maxLength="16"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
            margin="normal"
            className="form-control mb-3"
          />
          <Box display="flex" gap={2}>
            <input
              placeholder="Expiry Month"
              value={expiryMonth}
              onChange={(e) => setExpiryMonth(e.target.value)}
              required
              sx={{ width: "50%" }}
              className="form-control mb-3"
            />
            <input
              placeholder="Expiry Year"
              value={expiryYear}
              onChange={(e) => setExpiryYear(e.target.value)}
              required
              sx={{ width: "50%" }}
              className="form-control mb-3"
            />
          </Box>
          <input
            fullWidth
            placeholder="Cardholder Name"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
            required
            margin="normal"
            className="form-control mb-3"
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Pay Now
          </Button>
        </form>
      </Card>
    </>
  );
}
