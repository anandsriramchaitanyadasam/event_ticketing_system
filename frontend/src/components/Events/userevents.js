/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApihandler } from "../../Apihandler";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

const UserEvents = () => {
  const [events, setEvents] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category_name, event_date, city } = useParams();

  useEffect(() => {
    if (category_name && event_date && city) {
      getEvents();
    }
  }, [category_name, event_date, city]);

  const getEvents = async () => {
    try {
      // setLoading(true);
      const res = await getApihandler(
        `/searchEvents?category_name=${category_name}&event_date=${event_date}&city=${city}`
      );
      console.log("search api res-->", res);
      setEvents(res.data); // Assuming the API returns data in a `data` field
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to fetch events. Please try again later.");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <>
      <Header />
      {/* <h2>
        Events in {city} on {event_date}
      </h2> */}
      <Grid container spacing={3} justifyContent="center">
        {events.length > 0 ? (
          events.map((event) => (
            <Grid item key={event._id} xs={12} sm={6} md={4} lg={3}>
              <Card className="mt-5 mb-5">
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:80/uploads/${event.photoUrl}`}
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
                    Event Start Time: {event.event_start_time}
                  </Typography>
                  <Typography variant="body2">
                    Event End Time: {event.event_end_time}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              sx={{ mt: 5, mb: 5 }}
            >
              No Events Found
            </Typography>
          </Grid>
        )}
      </Grid>

      <Footer />
    </>
  );
};

export default UserEvents;
