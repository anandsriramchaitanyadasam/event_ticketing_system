/** @format */

// ✅ React core imports
import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

// ✅ API call utility function
import { getApihandler } from "../../Apihandler";

// ✅ Layout components
import Header from "../../layout/header";
import Footer from "../../layout/footer";

// ✅ MUI components for layout and styling
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

// ✅ Main Component for displaying filtered or all events
const UserEvents = () => {
  const [events, setEvents] = useState([]); // holds event data from API
  const [error, setError] = useState(null); // error state for API issues
  const location = useLocation(); // gets query string like ?city=delhi

  /**
   * ✅ Fetch events from API based on query params in the URL
   * Uses useCallback to avoid dependency warning in useEffect
   */
  const getEvents = useCallback(async () => {
    try {
      // Parse query parameters from URL
      const searchParams = new URLSearchParams(location.search);

      const categoryname = searchParams.get("category_name");
      const city = searchParams.get("city");
      const eventdate = searchParams.get("event_date");

      // Construct query string from non-empty filters
      const queryString = [
        categoryname ? `category_name=${encodeURIComponent(categoryname)}` : "",
        city ? `city=${encodeURIComponent(city)}` : "",
        eventdate ? `event_date=${encodeURIComponent(eventdate)}` : "",
      ]
        .filter(Boolean) // removes empty strings
        .join("&");

      // Call API using getApihandler
      const res = await getApihandler(`/searchEvents?${queryString}`);
      console.log("search API response -->", res);

      // Update events state or empty fallback
      setEvents(res?.data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError(
        error?.message || "Failed to fetch events. Please try again later."
      );
    }
  }, [location.search]);

  // ✅ useEffect triggers getEvents on first load or if URL params change
  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <>
      <Header />
      <Grid container spacing={3} justifyContent="center">
        {events.length > 0 ? (
          // ✅ Render event cards if data is available
          events.map((event) => (
            <Grid item key={event._id} xs={12} sm={6} md={4} lg={3}>
              <Link
                to={`/eventdetails/${event._id}`}
                style={{ textDecoration: "none" }}
              >
                <Card className="mt-5 mb-5">
                  {/* ✅ Event banner image */}
                  <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:80/uploads/${event.photoUrl}`}
                    alt={event.event_name} // accessible alt tag
                  />
                  <CardContent>
                    {/* ✅ Event title */}
                    <Typography variant="h6">{event.event_name}</Typography>

                    {/* ✅ Location info */}
                    <Typography variant="body2" color="textSecondary">
                      {event.city}, {event.state}, {event.country}
                    </Typography>

                    {/* ✅ Pricing info */}
                    <Typography variant="body2" fontWeight="bold">
                      Standard Price: ₹{event.standard_price || 0}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      VIP Price: ₹{event.vip_price || 0}
                    </Typography>

                    {/* ✅ Category and address */}
                    <Typography variant="body2" color="primary">
                      Category: {event.category_name}
                    </Typography>
                    <Typography variant="body2">
                      Event Address: {event.event_address}
                    </Typography>

                    {/* ✅ Event time */}
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
          // ✅ Show fallback message if no events are found
          <Grid item xs={12}>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              sx={{ mt: 5, mb: 5 }}
            >
              {error ? error : "No Events Found"}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Footer />
    </>
  );
};

export default UserEvents;
