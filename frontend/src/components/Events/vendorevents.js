/** @format */

import React, { useEffect, useState } from "react";
import {
  deleteApihandler,
  getApihandler,
  postApihandler,
  putApihandler,
} from "../../Apihandler";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Modal,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import Header from "../../layout/header";
import Footer from "../../layout/footer";

const style = {
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "180vh",
};

export default function VendorEvents() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const vendorId = localStorage.getItem("vendor_Id");

  useEffect(() => {
    getCategory();
  }, []);

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

  const [eventname, setEventName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [standardPrice, setStandardPrice] = useState("");
  const [vipPrice, setVipPrice] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleFileChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const addEvents = async () => {
    const formData = new FormData();
    formData.append("vendor_Id", vendorId);
    formData.append("event_name", eventname);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("standard_price", standardPrice);
    formData.append("vip_price", vipPrice);
    formData.append("event_date", eventDate);
    formData.append("event_start_time", eventStartTime);
    formData.append("event_end_time", eventEndTime);
    formData.append("event_address", eventAddress);
    formData.append("category_id", selectedCategoryId);
    formData.append("category", selectedCategory);
    formData.append("photo", photos[0]);


    try {
      const res = await postApihandler("/addEvent", formData);
      console.log("Events added successfully:", res);
      if (res.message === "Event added successfully") {
        getVendorEvents();
        Swal.fire({
          title: "Event Add Successfully",
          icon: "success",
        });
        setOpen(false);
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };
  // ********* get Events ****************
  const [events, setEvents] = useState([]);
  console.log("event is", events);
  useEffect(() => {
    getVendorEvents();
  }, []);
  const getVendorEvents = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const vendorId = userData._id;
    const res = await getApihandler(`/getVendorEvents/${vendorId}`);
    console.log("get vendor events --->", res);
    if (res.message === "Vendor events retrieved successfully") {
      setEvents(res.data);
    }
  };

  // ******** delete events ******
  const deleteEvents = async (id) => {
    const res = await deleteApihandler(`/deleteEvent/${id}`);
    console.log("delete api res is --->", res);
    if (res.message === "Event deleted successfully") {
      Swal.fire({
        title: "Delete Event Successfully",
        icon: "success",
      });
      getVendorEvents();
    }
  };

  // ******** update events *******

  const [eventid, setEventId] = useState("");
  const [index, setIndex] = useState("");
  const [open1, setOpen1] = useState(false);

  const handleClose1 = () => setOpen1(false);
  useEffect(() => {
    if (index !== "") {
      const {
        event_name,
        country,
        state,
        city,
        standard_price,
        vip_price,
        event_address,
        event_date,
        event_start_time,
        event_end_time,
        category,
      } = events[index] || {};
      setEventName(event_name || "");
      setCountry(country || "");
      setState(state || "");
      setCity(city || "");
      setStandardPrice(standard_price || "");
      setVipPrice(vip_price || "");
      setEventDate(event_date || "");
      setEventStartTime(event_start_time || "");
      setEventEndTime(event_end_time || "");
      setEventAddress(event_address || "");
      setSelectedCategory(category || "");
      setOpen1(true);
    }
  }, [index]);
  const updateEvents = async () => {
    const formData = new FormData();
    formData.append("vendor_Id", vendorId);
    formData.append("event_name", eventname);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("standard_price", standardPrice);
    formData.append("vip_price", vipPrice);
    formData.append("event_date", eventDate);
    formData.append("event_start_time", eventStartTime);
    formData.append("event_end_time", eventEndTime);
    formData.append("event_address", eventAddress);
    formData.append("category_id", selectedCategoryId);
    formData.append("category", selectedCategory);
    formData.append("photo", photos[0]); 


    const res = await putApihandler(`/editEventByVendor/${eventid}`, formData);
    console.log("update api res is --->", res);
    try {
      if (res.message === "Event updated successfully") {
        Swal.fire({
          title: "Event updated successfully",
          icon: "success",
        });
        setOpen1(false);
        getVendorEvents();
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };
  return (
    <>
      <Header />
      <div className="mt-5">
        <Button
          onClick={handleOpen}
          sx={{
            backgroundColor: "#60156d",
            color: "white",
            marginLeft: "30px",
          }}
        >
          Add Events
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          overflowY: "scroll",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="d-flex justify-content-center">
          <Box sx={style}>
            <h6>Add Events</h6>
            <TextField
              label="Event Name"
              fullWidth
              margin="normal"
              onChange={(e) => setEventName(e.target.value)}
            />
            <TextField
              label="Country"
              fullWidth
              margin="normal"
              onChange={(e) => setCountry(e.target.value)}
            />
            <TextField
              label="State"
              fullWidth
              margin="normal"
              onChange={(e) => setState(e.target.value)}
            />
            <TextField
              label="City"
              fullWidth
              margin="normal"
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              label="Standard Price"
              fullWidth
              margin="normal"
              onChange={(e) => setStandardPrice(e.target.value)}
            />
            <TextField
              label="VIP Price"
              fullWidth
              margin="normal"
              onChange={(e) => setVipPrice(e.target.value)}
            />
            <TextField
              label="Event Date"
              type="date"
              fullWidth
              margin="normal"
              onChange={(e) => setEventDate(e.target.value)}
            />
            <TextField
              label="Start Time"
              type="time"
              fullWidth
              margin="normal"
              onChange={(e) => setEventStartTime(e.target.value)}
            />
            <TextField
              label="End Time"
              type="time"
              fullWidth
              margin="normal"
              onChange={(e) => setEventEndTime(e.target.value)}
            />
            <TextField
              label="Event Address"
              fullWidth
              margin="normal"
              onChange={(e) => setEventAddress(e.target.value)}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
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

            <div className="mt-4">
            <input type="file" onChange={handleFileChange} />
            </div>
            <Button variant="contained" className="mt-3" onClick={addEvents}>
              Add Event
            </Button>
          </Box>
        </div>
      </Modal>
      {/* ****** get events ***** */}
      <Box sx={{ p: 3 }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Events</h2>
        <Grid container spacing={3} justifyContent="center">
          {events.map((event, index) => (
            <Grid item key={event._id} xs={12} sm={6} md={4} lg={3}>
              <Card>
              <CardMedia
                component="img"
                height="200"
                image={
                  event.photoUrl
                    ? `http://event-ticketing-backend-env.eba-ps2zgbhw.us-east-1.elasticbeanstalk.com/uploads/${event.photoUrl}`
                    : "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={event.event_name}
              />


                <CardContent>
                  <Typography variant="h6">{event.event_name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {event.city}, {event.state}, {event.country}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    Standard Price: ₹{event.standard_price || 0}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    VIP Price: ₹{event.vip_price || 0}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    Category: {event.category_name}
                  </Typography>
                  <Typography variant="body2">
                    Event Address: {event.event_address}
                  </Typography>
                  <Typography variant="body2">
                    Event Start Time :{event.event_start_time}
                  </Typography>
                  <Typography variant="body2">
                    Event End Time :{event.event_end_time}
                  </Typography>
                  <div className="d-flex justify-content-around mt-3">
                    <Button
                      variant="outlined"
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
                    >
                      Delete
                    </Button>
                    <Button
                      key={event._id}
                      variant="outlined"
                      onClick={() => {
                        setEventId(event._id);
                        setIndex(index);
                      }}
                    >
                      Update
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* ******** update modal ******** */}
      <Modal
        open={open1}
        onClose={handleClose1}
        sx={{
          overflowY: "scroll",
          display: "flex",

          justifyContent: "center",
        }}
      >
        <div className="d-flex justify-content-center">
          <Box sx={style}>
            <h6>Update Events</h6>
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
              label="Standard Price"
              fullWidth
              margin="normal"
              value={standardPrice}
              onChange={(e) => setStandardPrice(e.target.value)}
            />
            <TextField
              label="VIP Price"
              fullWidth
              margin="normal"
              value={vipPrice}
              onChange={(e) => setVipPrice(e.target.value)}
            />
            <TextField
              label="Event Date"
              type="date"
              fullWidth
              margin="normal"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
            <TextField
              label="Start Time"
              type="time"
              fullWidth
              margin="normal"
              value={eventStartTime}
              onChange={(e) => setEventStartTime(e.target.value)}
            />
            <TextField
              label="End Time"
              type="time"
              fullWidth
              margin="normal"
              value={eventEndTime}
              onChange={(e) => setEventEndTime(e.target.value)}
            />
            <TextField
              label="Event Address"
              fullWidth
              margin="normal"
              value={eventAddress}
              onChange={(e) => setEventAddress(e.target.value)}
            />

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

            <div className="mt-4">
              <input type="file" onChange={handleFileChange} />
            </div>
            <Button variant="contained" className="mt-3" onClick={updateEvents}>
              Update Event
            </Button>
          </Box>
        </div>
      </Modal>
      <Footer />
    </>
  );
}
