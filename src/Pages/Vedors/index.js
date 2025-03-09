import React, { useEffect, useState } from "react";

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

export default function Vendors() {
  const [data, setData] = useState([]);
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
              {/* <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell> */}
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
                  {/* <IconButton
                    color="primary"
                    onClick={() => {
                      setUserId(user._id);
                      setIndex(index);
                      setOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton> */}

                  {/* Delete User with Confirmation */}
                  {/* <IconButton
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
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
}
