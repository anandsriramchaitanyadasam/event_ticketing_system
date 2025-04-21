import { useEffect, useState } from "react";        // React hooks for lifecycle & state management
import AdminLayout from "../../Layout/AdminLayout";  // Layout wrapper for admin dashboard pages
import { getApihandler } from "../../Apihandler";   // Reusable GET request handler
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

export default function Notification() {
  // State to hold the list of notifications
  const [notifications, setNotifications] = useState([]);

  // On component mount, fetch all notifications
  useEffect(() => {
    getNotification();
  }, []);

  // Fetch notifications from the backend
  const getNotification = async () => {
    const res = await getApihandler("/getAllNotifications");
    if (res.status === 200) {
      setNotifications(res.data);  // Store fetched notifications in state
    }
  };

  return (
    // Wrap the table in the admin dashboard layout
    <AdminLayout>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table aria-label="notifications table">
          <TableHead>
            <TableRow>
              <TableCell><strong>User Name</strong></TableCell>
              <TableCell><strong>Vendor Name</strong></TableCell>
              <TableCell><strong>Message</strong></TableCell>
              <TableCell><strong>Created At</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* If no notifications, show a placeholder row */}
            {notifications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No Notifications Found
                </TableCell>
              </TableRow>
            ) : (
              // Otherwise, map each notification to a table row
              notifications.map((notification) => (
                <TableRow key={notification._id}>
                  <TableCell>{notification.user_name}</TableCell>
                  <TableCell>{notification.vendor_Name}</TableCell>
                  <TableCell>{notification.message}</TableCell>
                  <TableCell>
                    {/* Format timestamp to a readable local string */}
                    {new Date(notification.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
}
