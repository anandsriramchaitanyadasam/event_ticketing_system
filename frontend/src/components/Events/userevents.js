/** @format */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { getApihandler } from "../../Apihandler";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

const UserEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    getEvents();
  }, [location.search]);

  const getEvents = async () => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const categoryname = searchParams.get("category_name");
      const city = searchParams.get("city");
      const eventdate = searchParams.get("event_date");

      const queryString = [
        categoryname ? `category_name=${encodeURIComponent(categoryname)}` : "",
        city ? `city=${encodeURIComponent(city)}` : "",
        eventdate ? `event_date=${encodeURIComponent(eventdate)}` : "",
      ]
        .filter(Boolean)
        .join("&");

      const res = await getApihandler(`/searchEvents?${queryString}`);
      console.log("search API response -->", res);

      setEvents(res?.data || []); // Ensure fallback to an empty array
    } catch (error) {
      console.error("Error fetching events:", error);
      setError(
        error?.message || "Failed to fetch events. Please try again later."
      );
    }
  };
  return (
    <>
      <Header />

      <Grid container spacing={3} justifyContent="center">
        {events.length > 0 ? (
          events.map((event) => (
            <Grid item key={event._id} xs={12} sm={6} md={4} lg={3}>
              <Link
                to={`/eventdetails/${event._id}`}
                style={{ textDecoration: "none" }}
              >
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
              </Link>
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
