/** @format */

import React, { useEffect, useState } from "react";
// API handlers for fetching and deleting events
import { deleteApihandler, getApihandler } from "../../Apihandler";
// Layout wrapper for admin pages
import AdminLayout from "../../Layout/AdminLayout";
// MUI components for table display
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// SweetAlert2 for confirmation dialogs
import Swal from "sweetalert2";
// Icon for delete action
import DeleteIcon from "@mui/icons-material/Delete";

export default function Events() {
  // State to hold the list of events
  const [events, setEvents] = useState([]);
  console.log("events is ", events);

  // Fetch events when component mounts
  useEffect(() => {
    getEvents();
  }, []);

  // GET request: retrieve all events from the server
  const getEvents = async () => {
    const res = await getApihandler("/getAllEvents");
    console.log("get events api res is --->", res);
    if (res.message === "Events fetched successfully") {
      setEvents(res.data);  // Store retrieved events in state
    }
  };

  // DELETE request: remove a specific event by ID
  const deleteEvents = async (id) => {
    const res = await deleteApihandler(`/deleteEvent/${id}`);
    console.log("delete api res --->", res);
    if (res.message === "Event deleted successfully") {
      Swal.fire({
        title: "Event deleted successfully",
        icon: "success",
      });
      getEvents();  // Refresh the list after deletion
    }
  };

  return (
    // Wrap the table in the admin dashboard layout
    <AdminLayout>
      <h3 style={{ fontWeight: "700" }}>Events</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="events table">
          <TableHead>
            <TableRow>
              {/* Table headers */}
              <TableCell><strong>Category Name</strong></TableCell>
              <TableCell><strong>City</strong></TableCell>
              <TableCell><strong>State</strong></TableCell>
              <TableCell><strong>Country</strong></TableCell>
              <TableCell><strong>Standard Price</strong></TableCell>
              <TableCell><strong>VIP Price</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Map over each event and render a row */}
            {events.map((event) => (
              <TableRow
                key={event._id}  // Unique key for React
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* Display event details in each cell */}
                <TableCell>{event.category_name}</TableCell>
                <TableCell>{event.city}</TableCell>
                <TableCell>{event.state}</TableCell>
                <TableCell>{event.country}</TableCell>
                <TableCell>{event.standard_price}</TableCell>
                <TableCell>{event.vip_price}</TableCell>
                <TableCell>
                  {/* Delete icon with confirmation dialog */}
                  <DeleteIcon
                    color="error"
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteEvents(event._id);
                        }
                      });
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
}
