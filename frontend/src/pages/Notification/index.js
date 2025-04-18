import React, { useEffect, useState } from "react";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import { getApihandler } from "../../Apihandler";
import { Box, Card, CardContent, Typography, Container } from "@mui/material";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const vendorid = userData?._id;
      const res = await getApihandler(`/getNotificationsForVendor/${vendorid}`);
      console.log("get notification res--->", res);
      if (res.status === 200) {
        setNotifications(res.data || []);
      }
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  return (
    <>
      <Header />
      <Container sx={{ minHeight: "70vh", mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Notifications
        </Typography>

        {notifications.length === 0 ? (
          <Typography align="center" color="textSecondary" mt={5}>
            No Notifications Found
          </Typography>
        ) : (
          <Box display="flex" flexDirection="column" gap={2} mt={3}>
            {notifications.map((notification) => (
              <Card key={notification._id} elevation={3}>
                <CardContent>
                  <Typography variant="h6">{notification.message}</Typography>
                  <Typography variant="subtitle2" color="textSecondary" mt={1}>
                    User: {notification.user_name} | Vendor:{" "}
                    {notification.vendor_Name}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(notification.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
      <Footer />
    </>
  );
}
