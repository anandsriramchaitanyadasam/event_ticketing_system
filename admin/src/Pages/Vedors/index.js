import React, { useEffect, useState } from "react";

import AdminLayout from "../../Layout/AdminLayout";
<<<<<<< HEAD
import {
  deleteApihandler,
  getApihandler,
  putApihandler,
} from "../../Apihandler";
=======
import { getApihandler } from "../../Apihandler";
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
<<<<<<< HEAD
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
=======
} from "@mui/material";

export default function Vendors() {
  const [data, setData] = useState([]);
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
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
<<<<<<< HEAD

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

=======
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
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
<<<<<<< HEAD
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
=======
              {/* <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell> */}
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
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
<<<<<<< HEAD
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setVendorId(user._id);
=======
                  {/* <IconButton
                    color="primary"
                    onClick={() => {
                      setUserId(user._id);
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
                      setIndex(index);
                      setOpen(true);
                    }}
                  >
                    <EditIcon />
<<<<<<< HEAD
                  </IconButton>

                  {/* Delete User with Confirmation */}
                  <IconButton
=======
                  </IconButton> */}

                  {/* Delete User with Confirmation */}
                  {/* <IconButton
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
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
<<<<<<< HEAD
                          deleteVendor(user._id);
=======
                          deleteUser(user._id);
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
                        }
                      });
                    }}
                    color="error"
                  >
                    <DeleteIcon />
<<<<<<< HEAD
                  </IconButton>
=======
                  </IconButton> */}
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
<<<<<<< HEAD
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
=======
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
    </AdminLayout>
  );
}
