import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApihandler, postApihandler } from "../../Apihandler";
import { Grid, Typography } from "@mui/material";
import Header from "../../layout/header";
import {
  Container,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";
import swal from "sweetalert";

export default function EventDetail() {
  const [events, setEvents] = useState({});
  const [ticketType, setTicketType] = useState("standard");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getEventDetails();
  }, []);
  const getEventDetails = async () => {
    const res = await getApihandler(`/events/${id}`);
    console.log("get event details is --->", res);
    if (res.status === 200) {
      setEvents(res.data[0]);
    }
  };

  //   ******** book now api *********

  const total = quantity * price;

  useEffect(() => {
    if (ticketType !== "") {
      if (ticketType === "standard") {
        setPrice(events.standard_price);
      } else {
        setPrice(events.vip_price);
      }
    }
  }, [ticketType]);

  const BookNow = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;
    // console.log("user id is --->", userId);
    const data = {
      userId: userId,
      eventId: id,
      quantity: quantity,
      ticketType: ticketType,
    };
    console.log("data is ---->", data);
    const res = await postApihandler("/bookEvent", data);
    console.log("book api response is -->", res);
    if (res.status === 200) {
      swal({
        icon: "success",
        title: "Ticket Booked successfully",
      });
      navigate(`/payment/${res.data._id}`);
    }
  };
  return (
    <>
      <Header />
      <section>
        <div className="container">
          <div>
            <img
              src={`http://localhost:80/uploads/${events.photoUrl}`}
              alt={events.event_name}
              style={{ width: "100%" }}
            />
            <div style={{ textAlign: "left" }}>
              <Typography variant="h4">{events.event_name}</Typography>
              <Typography variant="h5" color="textSecondary">
                {events.city}, {events.state}, {events.country}
              </Typography>

              <Typography variant="h5" color="primary">
                Category: {events.category_name}
              </Typography>
              <Typography variant="h6">
                Event Address: {events.event_address}
              </Typography>
              <Typography variant="h6">
                Event Start Time: {events.event_start_time}
              </Typography>
              <Typography variant="h6">
                Event End Time: {events.event_end_time}
              </Typography>
            </div>
            <Container
              maxWidth="md"
              sx={{
                mt: 3,
                p: 3,

                color: "black",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                Tickets
              </Typography>

              <Divider sx={{ background: "white", mt: 2, mb: 2 }} />

              {/* Ticket Selection */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <RadioGroup
                  row
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value)}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <FormControlLabel
                    value="standard"
                    control={<Radio color="default" />}
                    label="Standard Ticket"
                  />
                  <FormControlLabel
                    value="vip"
                    control={<Radio color="default" />}
                    label="VIP Ticket"
                  />
                </RadioGroup>
              </Box>

              <Divider sx={{ background: "white", mt: 2, mb: 2 }} />

              {/* Ticket Pricing Row */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body1" fontWeight="bold">
                  Standard Price
                </Typography>
                <Typography variant="h6">{events.standard_price}</Typography>
                <Typography variant="body1" fontWeight="bold">
                  VIP Price
                </Typography>
                <Typography variant="h6">{events.vip_price}</Typography>
              </Box>

              <Divider sx={{ background: "white", mt: 2, mb: 2 }} />

              {/* Quantity Selection */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body1" fontWeight="bold">
                  Quantity
                </Typography>

                <Select
                  //   value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  sx={{
                    background: "white",
                    color: "black",
                    borderRadius: 1,
                  }}
                >
                  {[...Array(11).keys()].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              <Divider sx={{ background: "white", mt: 2, mb: 2 }} />

              {/* Total & Checkout Button */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">{total || 0}</Typography>
              </Box>
              <div>
                <Button
                  variant="contained"
                  sx={{
                    mt: 3,

                    backgroundColor: "#60156d",
                    color: "white",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    "&:hover": { background: "#5A5A5A" },
                  }}
                  onClick={BookNow}
                >
                  Book Now
                </Button>
              </div>
            </Container>
          </div>
        </div>
      </section>
    </>
  );
}
