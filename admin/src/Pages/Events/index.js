/** @format */

import React, { useEffect, useState } from "react";
import { deleteApihandler, getApihandler } from "../../Apihandler";
import AdminLayout from "../../Layout/AdminLayout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
export default function Events() {
  const [events, setEvents] = useState([]);
  console.log("events is ", events);
  useEffect(() => {
    getEvents();
  }, []);
  // ****** get events ******
  const getEvents = async () => {
    const res = await getApihandler("/getAllEvents");
    console.log("get api res is --->", res);
    if (res.message === "Events fetched successfully") {
      setEvents(res.data);
    }
  };
  // ****** delete events *********
  const deleteEvents = async (id) => {
    const res = await deleteApihandler(`/deleteEvent/${id}`);
    console.log("delete api res --->", res);
    if (res.message === "Event deleted successfully") {
      Swal.fire({
        title: "Delete Event SuccessFully",
        icon: "success",
      });
    }
  };
  return (
    <AdminLayout>
      <h3 style={{ fontWeight: "700" }}>Events</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Standard Price</TableCell>
              <TableCell>VIP Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow
                key={event.category_name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {event.city}
                </TableCell>
                <TableCell>{event.state}</TableCell>
                <TableCell>{event.country}</TableCell>
                <TableCell>{event.event_name}</TableCell>
                <TableCell>{event.standard_price}</TableCell>
                <TableCell>{event.vip_price}</TableCell>
                <TableCell>
                  {" "}
                  <DeleteIcon
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
                    color="error"
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
