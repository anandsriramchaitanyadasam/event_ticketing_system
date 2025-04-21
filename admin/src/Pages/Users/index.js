/** @format */

import React, { useEffect, useState } from "react";
// Layout wrapper for admin pages
import AdminLayout from "../../Layout/AdminLayout";
// Reusable API handlers for GET, DELETE, and PUT requests
import {
  deleteApihandler,
  getApihandler,
  putApihandler,
} from "../../Apihandler";
// MUI components for table, modal, buttons, etc.
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Modal,
  Box,
  Button,
} from "@mui/material";
// Icons for actions
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// SweetAlert2 for nicer confirmation & alerts
import Swal from "sweetalert2";

export default function Users() {
  // State for table data
  const [data, setData] = useState([]);
  // ID of the user currently being edited
  const [userid, setUserId] = useState("");
  // Form fields in the edit modal
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countrycode, setCountryCode] = useState("");
  const [mobileno, setMobileNumber] = useState("");
  // Index of the selected row (to populate form when modal opens)
  const [index, setIndex] = useState(null);
  // Modal open/close flag
  const [open, setOpen] = useState(false);

  // On mount, fetch all users
  useEffect(() => {
    getUsers();
  }, []);

  // Fetch users from API and store in state
  const getUsers = async () => {
    const res = await getApihandler("/admin/getAllUsers");
    console.log("get userapi ", res);
    if (res.message === "Users fetched successfully") {
      setData(res.data);
    }
  };

  // Delete a user by ID, then refresh the list
  const deleteUser = async (id) => {
    const res = await deleteApihandler(`/admin/deleteUser/${id}`);
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        text: "User deleted successfully!",
      });
      getUsers();
    } else {
      Swal.fire({
        icon: "error",
        text: "Failed to delete user!",
      });
    }
  };

  // When `index` changes (i.e. a row was selected), populate the modal form fields
  useEffect(() => {
    if (index !== null && data[index]) {
      const { user_Name, user_Email, country_code, mobile_no } =
        data[index];
      setName(user_Name || "");
      setEmail(user_Email || "");
      setCountryCode(country_code || "");
      setMobileNumber(mobile_no || "");
    }
  }, [index, data]);

  // Send updated user data to the server, then refresh & close modal
  const handleUpdateUser = async () => {
    const item = {
      user_Name: name,
      user_Email: email,
      country_code: countrycode,
      mobile_no: mobileno,
    };

    const res = await putApihandler(`/admin/editUser/${userid}`, item);
    console.log("Update API response:", res);

    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        text: "User updated successfully!",
      });
      setOpen(false);
      getUsers();
    } else {
      Swal.fire({
        icon: "error",
        text: "Failed to update user!",
      });
    }
  };

  return (
    // Wrap the content in the AdminLayout (e.g. sidebar, header)
    <AdminLayout>
      <h1>Users List</h1>

      {/* Table container */}
      <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mobile</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user, idx) => (
              <TableRow key={user._id}>
                <TableCell>{user.user_Name}</TableCell>
                <TableCell>{user.user_Email}</TableCell>
                <TableCell>{user.mobile_no}</TableCell>
                <TableCell>
                  {/* Edit button: set selected user, open modal */}
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setUserId(user._id);
                      setIndex(idx);
                      setOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  {/* Delete button with confirmation dialog */}
                  <IconButton
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
                          deleteUser(user._id);
                        }
                      });
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for editing a user */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2>Edit User</h2>

          {/* Editable form fields */}
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Country Code"
            fullWidth
            margin="normal"
            value={countrycode}
            onChange={(e) => setCountryCode(e.target.value)}
          />
          <TextField
            label="Mobile Number"
            fullWidth
            margin="normal"
            value={mobileno}
            onChange={(e) => setMobileNumber(e.target.value)}
          />

          {/* Action buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={() => setOpen(false)} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateUser}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </AdminLayout>
  );
}
