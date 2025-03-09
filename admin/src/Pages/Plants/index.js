import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import AdminLayout from "../../Layout/AdminLayout";
import {
  deleteApihandler,
  getApihandler,
  postApihandler,
  putApihandler,
} from "../../Apihandler";
import Swal from "sweetalert2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Typography } from "@mui/material";
// import Swal from "sweetalert2";

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

export default function Plants() {
  const [open, setOpen] = useState(false);
  const [plantname, setPlantName] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (e) => {
    setPhotos(Array.from(e.target.files)); // Convert FileList to an array
  };

  const addPlants = async () => {
    const formData = new FormData();
    formData.append("plant_name", plantname);
    formData.append("description", description);

    photos.forEach((photo) => {
      formData.append("photos", photo); // Append each file correctly
    });
    console.log("formdata is ---->", formData);
    try {
      const res = await postApihandler("/addPlant", formData);
      console.log("Plant added successfully:", res);
      if (res.message === "Add plant successfully") {
        Swal.fire({
          icon: "success",
          text: "Plant  added successfully!",
        });
        handleClose(); // Close modal after success
      }
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  //   ******* get api ********

  const [data, setPlantData] = useState([]);
  console.log("plant data is --->", data);
  useEffect(() => {
    getPlants();
  }, []);
  const getPlants = async () => {
    const res = await getApihandler("/getPlant");
    console.log("get plants api response is ---->", res);
    setPlantData(res.data);
  };

  //   ********* delete api *******

  const deletePlant = async (id) => {
    console.log("id is ---->", id);
    const res = await deleteApihandler(`/deletePlant/${id}`);
    console.log("delte api response is ---->", res);
    if (res.message === "Plant deleted successfully") {
      Swal.fire({
        icon: "success",
        text: "User deleted successfully!",
      });
      getPlants();
    } else {
      Swal.fire({
        icon: "error",
        text: "Failed to delete user!",
      });
    }
  };

  // ******** update api **********
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [plantid, setPlantId] = useState("");
  const [index, setIndex] = useState("");
  useEffect(() => {
    if (index !== null && data[index]) {
      const { plantname, description } = data[index] || {};
      setPlantName(plantname || "");
      setDescription(description || "");
    }
  }, [index, data]);
  const updatePlant = async () => {
    const formData = new FormData();
    formData.append("plantname", plantname);
    formData.append("description", description);

    // Append each image file to FormData
    photos.forEach((photo) => {
      formData.append("photos", photo);
    });
    const res = await putApihandler(`/updatePlant/${plantid}`, formData);
    console.log("update plant api response is ---->", res);
    if (res.message === "Plant updated successfully") {
      Swal.fire({
        icon: "success",
        text: "Plant updated successfully!",
      });
      setOpen1(false);
      getPlants();
    } else {
      Swal.fire({
        icon: "error",
        text: "Failed to update user!",
      });
    }
  };

  // ********* add tag api **********
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [tagname, setTagName] = useState("");
  const [color, setColor] = useState("");
  const [id, setId] = useState("");
  console.log("id is ----", id);
  const addTag = async () => {
    const data = {
      name: tagname,
      color: color,
    };
    const res = await putApihandler(`/addTag/${id}`, data);
    console.log("add tag api response is ---->", res);
    if (res.message === "Tag add successfully") {
      Swal.fire({
        icon: "success",
        text: "Tag added successfully!",
      });
      handleClose2(); // Close the modal after success
    } else {
      Swal.fire({
        icon: "error",
        text: "Failed to add tag!",
      });
    }
  };
  return (
    <AdminLayout>
      <div style={{ textAlign: "left" }}>
        <Button variant="contained" onClick={handleOpen}>
          Add Plants
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <h6>Add Plants</h6>
          <TextField
            label="Plant Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={plantname}
            onChange={(e) => setPlantName(e.target.value)}
          />
          <TextField
            label="Add your Description Here..."
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="mt-4">
            <input type="file" multiple onChange={handleFileChange} />
          </div>
          <Button variant="contained" className="mt-3" onClick={addPlants}>
            Add Plant
          </Button>
        </Box>
      </Modal>

      {/* ******* table ********* */}
      <TableContainer component={Paper} className="mt-5">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Plants</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Images</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Tag</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((plantdata) => (
              <TableRow
                key={plantdata.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {plantdata.plant_name}
                </TableCell>
                <TableCell>{plantdata.description}</TableCell>
                <TableCell>
                  {plantdata.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={`http://localhost:80/${photo.replace("\\", "/")}`} // Directly using the URL
                      alt="Plant"
                      style={{
                        width: 100,
                        height: 100,
                        marginRight: 10,
                        borderRadius: 5,
                      }}
                    />
                  ))}
                </TableCell>
                <TableCell>
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
                          deletePlant(plantdata._id);
                        }
                      });
                    }}
                    color="error"
                  >
                    <DeleteIcon sx={{ color: "black" }} />
                  </IconButton>
                  <EditIcon
                    onClick={() => {
                      setPlantId(plantdata._id);
                      setIndex(index);
                      setOpen1(true);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setId(plantdata._id);
                      // setIndex(index);
                      setOpen2(true);
                    }}
                  >
                    Add Tag
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ****** update modal ********* */}
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h6>Update Plants</h6>
          <TextField
            label="Plant Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={plantname}
            onChange={(e) => setPlantName(e.target.value)}
          />
          <TextField
            label="Add your Description Here..."
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="mt-4">
            <input type="file" multiple onChange={handleFileChange} />
          </div>
          <Button variant="contained" className="mt-3" onClick={updatePlant}>
            Update Plant
          </Button>
        </Box>
      </Modal>

      {/* ******** add tag modal************ */}
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h6>Add Tag</h6>
          <TextField
            label="Tag Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={tagname}
            onChange={(e) => setTagName(e.target.value)}
          />
          <TextField
            label="Color"
            variant="outlined"
            fullWidth
            margin="normal"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <Button variant="contained" onClick={addTag}>
            Add Tag
          </Button>
        </Box>
      </Modal>
    </AdminLayout>
  );
}
