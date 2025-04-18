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

export default function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotification();
  }, []);
  const getNotification = async () => {
    const res = await getApihandler("/getAllNotifications");

    if (res.status === 200) {
      setNotifications(res.data);
    }
  };
  return (
    <AdminLayout>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>User Name</b>
              </TableCell>
              <TableCell>
                <b>Vendor Name</b>
              </TableCell>
              <TableCell>
                <b>Message</b>
              </TableCell>
              <TableCell>
                <b>Created At</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No Notifications Found
                </TableCell>
              </TableRow>
            ) : (
              notifications.map((notification) => (
                <TableRow key={notification._id}>
                  <TableCell>{notification.user_name}</TableCell>
                  <TableCell>{notification.vendor_Name}</TableCell>
                  <TableCell>{notification.message}</TableCell>
                  <TableCell>
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
