import React, { useState } from "react";
import Header from "../../layout/header";
import {
  Box,
  Button,
  Card,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { postApihandler } from "../../Apihandler";
import swal from "sweetalert";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function Payment() {
  // ******* calendar*******
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(12), (val, index) => currentYear + index);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cvvnumber, setCvvNumber] = useState("");
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
        cvv: cvvnumber,
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
            <Select
              value={expiryMonth}
              onChange={(e) => setExpiryMonth(e.target.value)}
              displayEmpty
              required
              sx={{ width: "50%" }}
              className="form-control mb-3"
            >
              <MenuItem value="" disabled>
                Select Month
              </MenuItem>
              {months.map((month, index) => (
                <MenuItem key={index} value={index + 1}>
                  {month}
                </MenuItem>
              ))}
            </Select>

            <Select
              value={expiryYear}
              onChange={(e) => setExpiryYear(e.target.value)}
              displayEmpty
              required
              sx={{ width: "50%" }}
              className="form-control mb-3"
            >
              <MenuItem value="" disabled>
                Select Year
              </MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
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
          <input
            fullWidth
            placeholder="CVV Number"
            value={cvvnumber}
            maxLength="3"
            onChange={(e) => setCvvNumber(e.target.value)}
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
