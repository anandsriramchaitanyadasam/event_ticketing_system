import React, { useEffect, useState } from "react";

import AdminLayout from "../../Layout/AdminLayout";
import {
  deleteApihandler,
  getApihandler,
  putApihandler,
} from "../../Apihandler";
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
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";

import DeleteIcon from "@mui/icons-material/Delete";
export default function Vendors() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countrycode, setCountryCode] = useState("");
  const [mobileno, setMobileNumber] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getVendors();
  }, []);
  const getVendors = async () => {
    const res = await getApihandler("/admin/getAllVendors");
    console.log("get vendors ", res);
    if (res.message === "Vendors fetched successfully") {
      setData(res.data);
    }
  };

  // ********** delete vendors *********
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

  // ******** update vendors ********
  const [vendorid, setVendorId] = useState();
  const [index, setIndex] = useState("");
  useEffect(() => {
    if (index !== "" && data[index]) {
      const { vendor_Name, vendor_Email, country_code, mobile_no } =
        data[index] || {};
      setName(vendor_Name || "");
      setEmail(vendor_Email || "");
      setCountryCode(country_code || "");
      setMobileNumber(mobile_no || "");
    }
  }, [index, data]);

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
        text: "Failed to update user!",
      });
    }
  };

  return (
    <AdminLayout>
      <h3>Vendors</h3>
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
            {data.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>{user.vendor_Name}</TableCell>
                <TableCell>{user.vendor_Email}</TableCell>
                <TableCell>{user.mobile_no}</TableCell>
                <TableCell>
                  {/* Edit User */}
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setVendorId(user._id);
                      setIndex(index);
                      setOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  {/* Delete User with Confirmation */}
                  <IconButton
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
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
