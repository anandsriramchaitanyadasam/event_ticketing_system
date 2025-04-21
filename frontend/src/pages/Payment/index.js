import React, { useState } from "react";  // React import and useState for state management
import Header from "../../layout/header";  // Importing Header component for the page layout
import {
  Box,
  Button,
  Card,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";  // MUI components for UI elements
import { postApihandler } from "../../Apihandler";  // Helper function to handle API requests
import swal from "sweetalert";  // For showing alert messages
import { useNavigate, useParams } from "react-router-dom";  // React Router hooks for navigation and parameter extraction

export default function Payment() {
  // Calendar setup for years and months dropdown
  const currentYear = new Date().getFullYear();  // Get the current year
  const years = Array.from(new Array(12), (val, index) => currentYear + index);  // Array for next 12 years
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];  // Array for months
  
  // State management for the form fields
  const [cardNumber, setCardNumber] = useState("");  // For card number input
  const [expiryMonth, setExpiryMonth] = useState("");  // For expiry month
  const [expiryYear, setExpiryYear] = useState("");  // For expiry year
  const [cardHolderName, setCardHolderName] = useState("");  // For cardholder name
  const [cvvnumber, setCvvNumber] = useState("");  // For CVV number
  
  const { id } = useParams();  // Extract booking ID from the URL parameters
  const navigate = useNavigate();  // Hook to navigate programmatically

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
    
    // Payment data to be sent to the server
    const paymentData = {
      bookingId: id,  // Booking ID from URL parameters
      cardDetails: {
        cardNumber: cardNumber,
        expiryMonth: expiryMonth,
        expiryYear: expiryYear,
        cardHolderName: cardHolderName,
        cvv: cvvnumber,
      },
    };
    console.log("payment data", paymentData);  // Log payment data for debugging

    // API call to process payment
    const res = await postApihandler("/processPayment", paymentData);
    console.log("payment api res is --->", res);  // Log response from the API

    // Handle success and error responses
    if (res.status === 200) {
      swal({
        icon: "success",
        title: "Payment submitted successfully",  // Success alert
      });
      navigate("/booking");  // Redirect to the booking page after successful payment
    } else {
      swal(
        "Error",
        res.error.response.data.message || "An unknown error occurred.",  // Error alert
        "error"
      );
    }
  };

  return (
    <>
      <Header />  {/* Header component */}
      
      <Card sx={{ padding: 3, maxWidth: 400, margin: "auto", mt: 5, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Enter Payment Details  {/* Heading */}
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Card Number Input */}
          <input
            fullWidth
            placeholder="Card Number"
            maxLength="16"  // Card number length (16 digits)
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}  // Update state on change
            required  // Make the field required
            margin="normal"
            className="form-control mb-3"
          />
          
          <Box display="flex" gap={2}>
            {/* Expiry Month Dropdown */}
            <Select
              value={expiryMonth}
              onChange={(e) => setExpiryMonth(e.target.value)}  // Update month on change
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

            {/* Expiry Year Dropdown */}
            <Select
              value={expiryYear}
              onChange={(e) => setExpiryYear(e.target.value)}  // Update year on change
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
          
          {/* Cardholder Name Input */}
          <input
            fullWidth
            placeholder="Cardholder Name"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}  // Update cardholder name on change
            required
            margin="normal"
            className="form-control mb-3"
          />
          
          {/* CVV Input */}
          <input
            fullWidth
            placeholder="CVV Number"
            value={cvvnumber}
            maxLength="3"  // CVV length (3 digits)
            onChange={(e) => setCvvNumber(e.target.value)}  // Update CVV on change
            required
            margin="normal"
            className="form-control mb-3"
          />

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Pay Now
          </Button>
        </form>
      </Card>
    </>
  );
}
