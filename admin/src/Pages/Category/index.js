import React, { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  deleteApihandler,
  getApihandler,
  postApihandler,
  putApihandler,
} from "../../Apihandler";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Category() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categoryname, setCategoryName] = useState("");
  const [data, setData] = useState([]);
  const [photos, setPhotos] = useState([]);

  const handleFileChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const AddCategory = async () => {
    const formData = new FormData();
    formData.append("category_name", categoryname);
    photos.forEach((photo) => {
      formData.append("photo", photo);
    });
  
    // ✅ Check if category already exists
    const alreadyExists = data.some(
      (item) => item.category_name.toLowerCase() === categoryname.trim().toLowerCase()
    );
  
    if (alreadyExists) {
      Swal.fire({
        title: "Category Already Exists!",
        text: "Please enter a different category name.",
        icon: "warning",
      });
      return; // stop here, don't call API
    }
  
    const res = await postApihandler("/admin/categories", formData);
    console.log("add category res -->", res);
  
    if (res.message === "Category added successfully") {
      Swal.fire({ title: "Category Added Successfully", icon: "success" });
      getCategory();
      setOpen(false);
    }
  };
  

  //   ***** get category api *********
  useEffect(() => {
    getCategory();
  }, []);

  // ==== get category ========
  const getCategory = async () => {
    const res = await getApihandler("/admin/getAllCategories");
    console.log("get api res is --->", res);
    if (res.message === "Categories fetched successfully") {
      setData(res.data);
    }
  };

  //   ********** delete category api *******
  const deleteCategory = async (id) => {
    const res = await deleteApihandler(`/admin/deleteCategory/${id}`);
    console.log("delete api res --->", res);
    if (res.message === "Category deleted successfully") {
      Swal.fire({
        title: "category deleted successfully",
        icon: "success",
      });
      getCategory();
    }
  };
  //   ***** update category api *******
  const [categoryid, setCategoryId] = useState();
  const [index, setIndex] = useState("");
  const [open1, setOpen1] = React.useState(false);
 // const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  useEffect(() => {
    if (index !== null && data[index]) {
      const { category_name } = data[index] || {};
      setCategoryName(category_name || "");
    }
  }, [data, index]);

  const updateCategory = async () => {
    const formData = new FormData();
    formData.append("category_name", categoryname);
    photos.forEach((photo) => {
      formData.append("photo", photo);
    });
    const res = await putApihandler(
      `/admin/updateCategory/${categoryid}`,
      formData
    );
    console.log("update res --->", res);
    if (res.message === "Category updated successfully") {
      Swal.fire({
        title: "Category updated successfully",
        icon: "success",
      });
      getCategory();
      setOpen1(false);
    }
  };

  return (
    <AdminLayout>
      <h1>Category</h1>
      <div style={{ textAlign: "left" }}>
        <Button variant="outlined" onClick={handleOpen}>
          Add Category
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Category
          </Typography>
          <TextField
            id="outlined-basic"
            label="Category Name"
            variant="outlined"
            className="mt-3"
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <div className="mt-4">
            <input type="file" multiple onChange={handleFileChange} />
          </div>
          <Button variant="contained" className="mt-3" onClick={AddCategory}>
            Add Category
          </Button>
        </Box>
      </Modal>
      <TableContainer component={Paper} className="mt-3">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((category) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                <img
                  src={
                    category.photoUrl
                      ? `http://event-ticketing-backend-env.eba-ps2zgbhw.us-east-1.elasticbeanstalk.com/uploads/${category.photoUrl}`
                      : "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={category.category_name}
                  width="50"
                  height="30"
                />

                </TableCell>

                <TableCell component="th" scope="row">
                  {category.category_name}
                </TableCell>
                <TableCell component="th" scope="row" sx={{ display: "flex" }}>
                  <DeleteIcon
                    sx={{ marginRight: "5px", marginTop: "5px" }}
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
                          deleteCategory(category._id);
                        }
                      });
                    }}
                    color="error"
                  />
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setCategoryId(category._id);
                      setIndex(
                        data.findIndex((item) => item._id === category._id)
                      );
                      setOpen1(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* ******* update modal ********** */}
      <Modal open={open1} onClose={handleClose1}>
        <Box sx={style}>
          <Typography variant="h6">Update Category</Typography>
          <TextField
            label="Category Name"
            variant="outlined"
            className="mt-3"
            value={categoryname} // Ensure correct value is set
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <div className="mt-4">
            <input type="file" multiple onChange={handleFileChange} />
          </div>
          <Button variant="contained" className="mt-3" onClick={updateCategory}>
            Update Category
          </Button>
        </Box>
      </Modal>
    </AdminLayout>
  );
}
