/** @format */

import React from "react";
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

// Styling for the modal box
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
  // State hook for modal visibility
  const [open, setOpen] = React.useState(false);

  // Functions to handle modal open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // State hooks for storing event data and categories
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  // Log the selected category ID (for debugging purposes)
  console.log("category id is ", selectedCategoryId);

  // Retrieve vendorId from localStorage (to associate events with the vendor)
  const vendorId = localStorage.getItem("vendor_Id");
  console.log("vendor id is --->", vendorId);

  // Fetch categories from the backend when the component mounts
  useEffect(() => {
    getCategory();
  }, []);

  // Function to fetch categories from the API
  const getCategory = async () => {
    try {
      const res = await getApihandler("/admin/getAllCategories");
      console.log("Get Category API Response:", res);
      if (res.message === "Categories fetched successfully") {
        setCategories(res.data); // Set categories state with the fetched data
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // State hooks for event details
  const [eventname, setEventName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [eventprice, setEventPrice] = useState("");
  const [photos, setPhotos] = useState([]); // For storing selected photos

  // Handle file change for photo uploads
  const handleFileChange = (e) => {
    setPhotos(Array.from(e.target.files)); // Store the selected files
  };

  // Function to add a new event by sending the event data to the backend
  const addEvents = async () => {
    const formData = new FormData();
    formData.append("vendor_Id", vendorId);
    formData.append("event_name", eventname);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("event_ticket_price", eventprice);
    formData.append("category_id", selectedCategoryId); // Add the selected category ID
    formData.append("category", selectedCategory); // Add the selected category name
    photos.forEach((photo) => {
      formData.append("photo", photo); // Add photos to the FormData
    });

    console.log("FormData is ---->", formData); // Log FormData for debugging

    try {
      const res = await postApihandler("/api/addEvent", formData);
      console.log("Events added successfully:", res); // Log response if event is added successfully
    } catch (error) {
      console.error("Error adding event:", error); // Log error if event addition fails
    }
  };

  // State hook for storing events fetched from the backend
  const [events, setEvents] = useState([]);
  console.log("events is ", events); // Log events data for debugging

  // Fetch all events when the component mounts
  useEffect(() => {
    getEvents();
  }, []);

  // Function to fetch events from the backend
  const getEvents = async () => {
    const res = await getApihandler("/getAllEvents");
    console.log("get api res is --->", res);
    if (res.message === "Events fetched successfully") {
      setEvents(res.data); // Update events state with the fetched data
    }
  };

  return (
    <div>
      <div className="mt-5 mb-5">
        {/* Button to open the modal */}
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

          {/* Event name input field */}
          <TextField
            label="Event Name"
            fullWidth
            margin="normal"
            value={eventname}
            onChange={(e) => setEventName(e.target.value)} // Update event name state
          />

          {/* Country input field */}
          <TextField
            label="Country"
            fullWidth
            margin="normal"
            value={country}
            onChange={(e) => setCountry(e.target.value)} // Update country state
          />

          {/* State input field */}
          <TextField
            label="State"
            fullWidth
            margin="normal"
            value={state}
            onChange={(e) => setState(e.target.value)} // Update state state
          />

          {/* City input field */}
          <TextField
            label="City"
            fullWidth
            margin="normal"
            value={city}
            onChange={(e) => setCity(e.target.value)} // Update city state
          />

          {/* Event price input field */}
          <TextField
            label="Event Price"
            fullWidth
            margin="normal"
            value={eventprice}
            onChange={(e) => setEventPrice(e.target.value)} // Update event price state
          />

          {/* Category dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategoryId} // Value of selected category
              onChange={(e) => {
                // Find the selected category by its ID and update the states
                const selectedCat = categories.find(
                  (cat) => cat._id === e.target.value
                );
                setSelectedCategoryId(selectedCat._id);
                setSelectedCategory(selectedCat.category_name);
              }}
            >
              {/* Dynamically populate the dropdown with categories */}
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.category_name} {/* Display category name */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* File input for selecting event photos */}
          <div className="mt-4">
            <input type="file" multiple onChange={handleFileChange} />
          </div>

          {/* Submit button to add the event */}
          <Button variant="contained" className="mt-3" onClick={addEvents}>
            Add Event
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
