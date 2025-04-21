import React, { useEffect, useState } from "react";  // React imports for managing state and lifecycle methods
import Header from "../../layout/header";  // Header component for the page layout
import { getApihandler } from "../../Apihandler";  // API handler to make GET requests
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";  // Material-UI components for UI elements

export default function PaymentHistory() {
  // State to hold payment data and user role
  const [paymentData, setPaymentData] = useState([]);  // Holds the payment data fetched from API
  const [role, setRole] = useState("");  // Holds the role of the user (user or vendor)

  // Effect hook to check the user role and fetch payment history accordingly
  useEffect(() => {
    const check = localStorage.getItem("role");  // Check the user's role from local storage
    if (check) {
      setRole(check);  // Set the role state
    }
    // Fetch payment history based on the role
    if (check === "user") {
      getUserPayments();  // Fetch user payment data if the role is user
    } else if (check === "vendor") {
      getVendorPayment();  // Fetch vendor payment data if the role is vendor
    }
  }, []);  // Runs once when the component mounts

  // Fetch payment history for a user
  const getUserPayments = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));  // Get user data from local storage
    const userid = userData._id;  // Extract user ID
    const res = await getApihandler(`/getUserPaymentsDetails/${userid}`);  // Make API call to get user payments
    console.log("get user payment history is --->", res);  // Log the response for debugging
    if (res.status === 200) {
      setPaymentData(res.data);  // Set the fetched payment data in state
    }
  };

  // Fetch payment history for a vendor
  const getVendorPayment = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));  // Get vendor data from local storage
    const vendorid = userData._id;  // Extract vendor ID
    const res = await getApihandler(`/getVendorPaymentsDetails/${vendorid}`);  // Make API call to get vendor payments
    console.log("get vendor payment history is --->", res);  // Log the response for debugging
    if (res.status === 200) {
      setPaymentData(res.data);  // Set the fetched payment data in state
    }
  };

  return (
    <>
      <Header />  {/* Header component */}
      
      <div style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Payment History  {/* Heading */}
        </Typography>

        {/* Conditional rendering based on user role */}
        {role === "user" ? (
          // If the role is user, display user-specific payment history
          <Grid container spacing={3}>
            {paymentData && paymentData.length > 0 ? (
              paymentData.map((payment, index) => (
                // Map through user payments and display each one in a Card
                <Grid item xs={4} key={index}>
                  <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                    <CardContent>
                      <Divider sx={{ marginBottom: 2 }} />

                      <Box sx={{ marginBottom: 1 }}>
                        <Typography>
                          <strong>Event Name:</strong>{" "}
                          {payment?.event?.Event_name || "N/A"}  {/* Display event name */}
                        </Typography>
                      </Box>

                      <Box sx={{ marginBottom: 1 }}>
                        <Typography>
                          <strong>User Name:</strong>{" "}
                          {payment?.user?.name || "N/A"}  {/* Display user name */}
                        </Typography>
                      </Box>

                      <Box sx={{ marginBottom: 1 }}>
                        <Typography>
                          <strong>Ticket Type:</strong>{" "}
                          {payment?.ticketType || "N/A"}  {/* Display ticket type */}
                        </Typography>

                        <Typography>
                          <strong>Total Price:</strong> ₹
                          {payment?.totalPrice || 0}  {/* Display total price */}
                        </Typography>
                        <Typography>
                          <strong>Payment Status:</strong>{" "}
                          {payment?.paymentStatus || "N/A"}  {/* Display payment status */}
                        </Typography>
                      </Box>

                      <Divider sx={{ marginY: 2 }} />
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>
                          Card Details  {/* Card details heading */}
                        </Typography>
                        <Typography>
                          <strong>Card Holder:</strong>{" "}
                          {payment?.cardDetails?.cardHolderName || "N/A"}  {/* Display cardholder name */}
                        </Typography>
                        <Typography>
                          <strong>Card Number:</strong>{" "}
                          {payment?.cardDetails?.cardNumber
                            ?.slice(-4)
                            .padStart(16, "*") || "N/A"}  {/* Mask card number and display last 4 digits */}
                        </Typography>
                        <Typography>
                          <strong>Expiry:</strong>{" "}
                          {payment?.cardDetails?.expiryMonth}/
                          {payment?.cardDetails?.expiryYear}  {/* Display expiry date */}
                        </Typography>
                      </Box>

                      <Divider sx={{ marginY: 2 }} />
                      <Typography variant="caption" color="textSecondary">
                        Payment Created:{" "}
                        {payment?.createdAt
                          ? new Date(payment.createdAt).toLocaleString()
                          : "N/A"}  {/* Display payment creation date */}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography
                variant="body1"
                sx={{ marginTop: 3, marginLeft: "20px" }}
              >
                No payment history found.  {/* If no payments found */}
              </Typography>
            )}
          </Grid>
        ) : (
          // If the role is vendor, display vendor-specific payment history
          <Grid container spacing={3}>
            {paymentData && paymentData.length > 0 ? (
              paymentData.map((payment, index) => (
                // Map through vendor payments and display each one in a Card
                <Grid item xs={12} key={index}>
                  <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                    <CardContent>
                      <Divider sx={{ marginBottom: 2 }} />

                      <Box sx={{ marginBottom: 2 }}>
                        <Typography>
                          <strong>Event Name:</strong>{" "}
                          {payment?.event?.Event_name || "N/A"}  {/* Display event name */}
                        </Typography>
                        <Typography>
                          <strong>Event Date:</strong>{" "}
                          {payment?.event?.date
                            ? new Date(payment.event.date).toLocaleDateString()
                            : "N/A"}  {/* Display event date */}
                        </Typography>
                      </Box>

                      <Box sx={{ marginBottom: 2 }}>
                        <Typography>
                          <strong>User Name:</strong>{" "}
                          {payment?.user?.name || "N/A"}  {/* Display user name */}
                        </Typography>
                        <Typography>
                          <strong>User Email:</strong>{" "}
                          {payment?.user?.email || "N/A"}  {/* Display user email */}
                        </Typography>
                      </Box>

                      <Box sx={{ marginBottom: 2 }}>
                        <Typography>
                          <strong>Ticket Type:</strong>{" "}
                          {payment?.ticketType || "N/A"}  {/* Display ticket type */}
                        </Typography>
                        <Typography>
                          <strong>Quantity:</strong> {payment?.quantity || 0}  {/* Display quantity */}
                        </Typography>
                        <Typography>
                          <strong>Total Price:</strong> ₹
                          {payment?.totalPrice || 0}  {/* Display total price */}
                        </Typography>
                        <Typography>
                          <strong>Payment Status:</strong>{" "}
                          {payment?.paymentStatus || "N/A"}  {/* Display payment status */}
                        </Typography>
                      </Box>

                      <Divider sx={{ marginY: 2 }} />
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>
                          Card Details  {/* Card details heading */}
                        </Typography>
                        <Typography>
                          <strong>Card Holder:</strong>{" "}
                          {payment?.cardDetails?.cardHolderName || "N/A"}  {/* Display cardholder name */}
                        </Typography>
                        <Typography>
                          <strong>Card Number:</strong>{" "}
                          {payment?.cardDetails?.cardNumber
                            ?.slice(-4)
                            .padStart(16, "*") || "N/A"}  {/* Mask card number and display last 4 digits */}
                        </Typography>
                        <Typography>
                          <strong>Expiry:</strong>{" "}
                          {payment?.cardDetails?.expiryMonth}/
                          {payment?.cardDetails?.expiryYear}  {/* Display expiry date */}
                        </Typography>
                      </Box>

                      <Divider sx={{ marginY: 2 }} />
                      <Typography variant="caption" color="textSecondary">
                        Payment Created:{" "}
                        {payment?.createdAt
                          ? new Date(payment.createdAt).toLocaleString()
                          : "N/A"}  {/* Display payment creation date */}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography
                variant="body1"
                sx={{ marginTop: 3, marginLeft: "20px" }}
              >
                No payment history found.  {/* If no payments found */}
              </Typography>
            )}
          </Grid>
        )}
      </div>
    </>
  );
}
