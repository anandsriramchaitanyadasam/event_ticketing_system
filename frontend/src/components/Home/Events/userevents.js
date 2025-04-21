/** @format */

import React, { useEffect, useState } from "react";
import { getApihandler, postApihandler } from "../../Apihandler";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Modal,
} from "@mui/material";

// Styling for the Modal box
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

export default function UserEvents() {
  // State to manage Modal open/close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Category-related states
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  // Get vendor ID from localStorage
  const vendorId = localStorage.getItem("vendor_Id");

  // Fetch categories when component mounts
  useEffect(() => {
    getCategory();
  }, []);

  // API call to fetch categories
  const getCategory = async () => {
    try {
      const res = await getApihandler("/admin/getAllCategories");
      if (res.message === "Categories fetched successfully") {
        setCategories(res.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Form input states
  const [eventname, setEventName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [eventprice, setEventPrice] = useState("");
  const [photos, setPhotos] = useState([]);

  // Handle file input change
  const handleFileChange = (e) => {
    setPhotos(Array.from(e.target.files)); // Convert FileList to array
  };

  // Submit event form
  const addEvents = async () => {
    const formData = new FormData();
    formData.append("vendor_Id", vendorId);
    formData.append("event_name", eventname);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("event_ticket_price", eventprice);
    formData.append("category_id", selectedCategoryId);
    formData.append("category", selectedCategory);
    photos.forEach((photo) => {
      formData.append("photo", photo);
    });

    try {
      const res = await postApihandler("/api/addEvent", formData);
      console.log("Events added successfully:", res);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // State to store all events
  const [events, setEvents] = useState([]);

  // Fetch all events on component mount
  useEffect(() => {
    getEvents();
  }, []);

  // API call to fetch all events
  const getEvents = async () => {
    const res = await getApihandler("/getAllEvents");
    if (res.message === "Events fetched successfully") {
      setEvents(res.data);
    }
  };

  return (
    <div>
      {/* Button to open the modal */}
      <div className="mt-5 mb-5">
        <Button
          onClick={handleOpen}
          sx={{
            backgroundColor: "#60156d",
            marginLeft: "30px",
            color: "white",
          }}
        >
          Add Events
        </Button>
      </div>

      {/* Modal for adding events */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflowY: "scroll" }}
      >
        <Box sx={style}>
          <h6>Add Events</h6>
          <TextField
            label="Event Name"
            fullWidth
            margin="normal"
            value={eventname}
            onChange={(e) => setEventName(e.target.value)}
          />
          <TextField
            label="Country"
            fullWidth
            margin="normal"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <TextField
            label="State"
            fullWidth
            margin="normal"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <TextField
            label="City"
            fullWidth
            margin="normal"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            label="Event Price"
            fullWidth
            margin="normal"
            value={eventprice}
            onChange={(e) => setEventPrice(e.target.value)}
          />

          {/* Dropdown for selecting category */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategoryId}
              onChange={(e) => {
                const selectedCat = categories.find(
                  (cat) => cat._id === e.target.value
                );
                setSelectedCategoryId(selectedCat._id);
                setSelectedCategory(selectedCat.category_name);
              }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.category_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* File input for event images */}
          <div className="mt-4">
            <input type="file" multiple onChange={handleFileChange} />
          </div>

          {/* Submit button */}
          <Button variant="contained" className="mt-3" onClick={addEvents}>
            Add Event
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
