import React, { useEffect, useState } from "react";

// Wraps page in the admin dashboard layout (e.g., sidebar, header)
import AdminLayout from "../../Layout/AdminLayout";

// Generic API handlers for GET, DELETE, and PUT requests
import {
  deleteApihandler,
  getApihandler,
  putApihandler,
} from "../../Apihandler";

// MUI components for table display and modal dialog
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Modal,
  Box,
  Button,
} from "@mui/material";

// For nicer alert/confirmation dialogs
import Swal from "sweetalert2";

// Icons for edit/delete actions
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Vendors() {
  // Holds the list of vendors fetched from the server
  const [data, setData] = useState([]);

  // Form fields for editing a vendor
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countrycode, setCountryCode] = useState("");
  const [mobileno, setMobileNumber] = useState("");

  // Whether the Edit modal is open
  const [open, setOpen] = useState(false);

  // ID of the vendor currently being edited
  const [vendorid, setVendorId] = useState();

  // Index in `data` of the vendor being edited (to pre-fill form)
  const [index, setIndex] = useState("");

  // On component mount, fetch all vendors
  useEffect(() => {
    getVendors();
  }, []);

  // Fetch vendor list from backend
  const getVendors = async () => {
    const res = await getApihandler("/admin/getAllVendors");
    console.log("get vendors ", res);
    if (res.message === "Vendors fetched successfully") {
      setData(res.data);
    }
  };

  // Delete a vendor by ID, then refresh the list
  const deleteVendor = async (id) => {
    const res = await deleteApihandler(`/deleteVendor/${id}`);
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        text: "Vendor deleted successfully!",
      });
      getVendors();
    } else {
      Swal.fire({
        icon: "error",
        text: "Failed to delete vendor!",
      });
    }
  };

  // Whenever `index` or `data` changes, populate the edit form fields
  useEffect(() => {
    if (index !== "" && data[index]) {
      const { vendor_Name, vendor_Email, country_code, mobile_no } =
        data[index];
      setName(vendor_Name || "");
      setEmail(vendor_Email || "");
      setCountryCode(country_code || "");
      setMobileNumber(mobile_no || "");
    }
  }, [index, data]);

  // Send updated vendor data to server, then refresh and close modal
  const UpdateVendors = async () => {
    const item = {
      vendor_Name: name,
      vendor_Email: email,
      country_code: countrycode,
      mobile_no: mobileno,
    };

    const res = await putApihandler(`/editVendor/${vendorid}`, item);
    console.log("update api res is ---->", res);
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        text: "Vendor updated successfully!",
      });
      setOpen(false);
      getVendors();
    } else {
      Swal.fire({
        icon: "error",
        text: "Failed to update vendor!",
      });
    }
  };

  return (
    <AdminLayout>
      <h3>Vendors</h3>

      {/* Table of vendors */}
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
                <TableCell>{user.vendor_Name}</TableCell>
                <TableCell>{user.vendor_Email}</TableCell>
                <TableCell>{user.mobile_no}</TableCell>
                <TableCell>
                  {/* Edit button: store ID & index, then open modal */}
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setVendorId(user._id);
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
                          deleteVendor(user._id);
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

      {/* Modal dialog for editing a vendor */}
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
          <h2>Edit Vendor</h2>

          {/* Form fields bound to state */}
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

          {/* Cancel / Save buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={() => setOpen(false)} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={UpdateVendors}>
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </AdminLayout>
  );
}
