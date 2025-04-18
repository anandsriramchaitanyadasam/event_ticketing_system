import React, { useEffect, useState } from "react";
import Header from "../../layout/header";
import { getApihandler } from "../../Apihandler";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

export default function PaymentHistory() {
  const [paymentData, setPaymentData] = useState([]);
  const [role, setRole] = useState("");
  useEffect(() => {
    const check = localStorage.getItem("role");
    if (check) {
      setRole(check);
    }
    if (check === "user") {
      getUserPayments();
    } else if (check === "vendor") {
      getVendorPayment();
    }
  }, []);
  //   ************ user payments ************
  const getUserPayments = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userid = userData._id;
    const res = await getApihandler(`/getUserPaymentsDetails/${userid}`);
    console.log("get user payment history is --->", res);
    if (res.status === 200) {
      setPaymentData(res.data);
    }
  };
  //   ******* vendor payments ***************
  const getVendorPayment = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const vendorid = userData._id;
    const res = await getApihandler(`/getVendorPaymentsDetails/${vendorid}`);
    console.log("get vendor payment history is --->", res);
    if (res.status === 200) {
      setPaymentData(res.data);
    }
  };

  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Payment History
        </Typography>
        {role === "user" ? (
          <Grid container spacing={3}>
            {paymentData && paymentData.length > 0 ? (
              paymentData.map((payment, index) => (
                <Grid item xs={4} key={index}>
                  <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                    <CardContent>
                      <Divider sx={{ marginBottom: 2 }} />

                      <Box sx={{ marginBottom: 1 }}>
                        <Typography>
                          <strong>Event Name:</strong>{" "}
                          {payment?.event?.Event_name || "N/A"}
                        </Typography>
                      </Box>

                      <Box sx={{ marginBottom: 1 }}>
                        <Typography>
                          <strong>User Name:</strong>{" "}
                          {payment?.user?.name || "N/A"}
                        </Typography>
                      </Box>

                      <Box sx={{ marginBottom: 1 }}>
                        <Typography>
                          <strong>Ticket Type:</strong>{" "}
                          {payment?.ticketType || "N/A"}
                        </Typography>

                        <Typography>
                          <strong>Total Price:</strong> ₹
                          {payment?.totalPrice || 0}
                        </Typography>
                        <Typography>
                          <strong>Payment Status:</strong>{" "}
                          {payment?.paymentStatus || "N/A"}
                        </Typography>
                      </Box>

                      <Divider sx={{ marginY: 2 }} />
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>
                          Card Details
                        </Typography>
                        <Typography>
                          <strong>Card Holder:</strong>{" "}
                          {payment?.cardDetails?.cardHolderName || "N/A"}
                        </Typography>
                        <Typography>
                          <strong>Card Number:</strong>{" "}
                          {payment?.cardDetails?.cardNumber
                            ?.slice(-4)
                            .padStart(16, "*") || "N/A"}
                        </Typography>
                        <Typography>
                          <strong>Expiry:</strong>{" "}
                          {payment?.cardDetails?.expiryMonth}/
                          {payment?.cardDetails?.expiryYear}
                        </Typography>
                      </Box>

                      <Divider sx={{ marginY: 2 }} />
                      <Typography variant="caption" color="textSecondary">
                        Payment Created:{" "}
                        {payment?.createdAt
                          ? new Date(payment.createdAt).toLocaleString()
                          : "N/A"}
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
                No payment history found.
              </Typography>
            )}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {paymentData && paymentData.length > 0 ? (
              paymentData.map((payment, index) => (
                <Grid item xs={12} key={index}>
                  <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                    <CardContent>
                      <Divider sx={{ marginBottom: 2 }} />

                      <Box sx={{ marginBottom: 2 }}>
                        <Typography>
                          <strong>Event Name:</strong>{" "}
                          {payment?.event?.Event_name || "N/A"}
                        </Typography>
                        <Typography>
                          <strong>Event Date:</strong>{" "}
                          {payment?.event?.date
                            ? new Date(payment.event.date).toLocaleDateString()
                            : "N/A"}
                        </Typography>
                      </Box>

                      <Box sx={{ marginBottom: 2 }}>
                        <Typography>
                          <strong>User Name:</strong>{" "}
                          {payment?.user?.name || "N/A"}
                        </Typography>
                        <Typography>
                          <strong>User Email:</strong>{" "}
                          {payment?.user?.email || "N/A"}
                        </Typography>
                      </Box>

                      <Box sx={{ marginBottom: 2 }}>
                        <Typography>
                          <strong>Ticket Type:</strong>{" "}
                          {payment?.ticketType || "N/A"}
                        </Typography>
                        <Typography>
                          <strong>Quantity:</strong> {payment?.quantity || 0}
                        </Typography>
                        <Typography>
                          <strong>Total Price:</strong> ₹
                          {payment?.totalPrice || 0}
                        </Typography>
                        <Typography>
                          <strong>Payment Status:</strong>{" "}
                          {payment?.paymentStatus || "N/A"}
                        </Typography>
                      </Box>

                      <Divider sx={{ marginY: 2 }} />
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>
                          Card Details
                        </Typography>
                        <Typography>
                          <strong>Card Holder:</strong>{" "}
                          {payment?.cardDetails?.cardHolderName || "N/A"}
                        </Typography>
                        <Typography>
                          <strong>Card Number:</strong>{" "}
                          {payment?.cardDetails?.cardNumber
                            ?.slice(-4)
                            .padStart(16, "*") || "N/A"}
                        </Typography>
                        <Typography>
                          <strong>Expiry:</strong>{" "}
                          {payment?.cardDetails?.expiryMonth}/
                          {payment?.cardDetails?.expiryYear}
                        </Typography>
                      </Box>

                      <Divider sx={{ marginY: 2 }} />
                      <Typography variant="caption" color="textSecondary">
                        Payment Created:{" "}
                        {payment?.createdAt
                          ? new Date(payment.createdAt).toLocaleString()
                          : "N/A"}
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
                No payment history found.
              </Typography>
            )}
          </Grid>
        )}
      </div>
    </>
  );
}
