/** @format */

import React, { useEffect, useState } from "react"; // React hooks for state and lifecycle
import { useLocation } from "react-router-dom"; // Hook to access URL query parameters
import { Link, useParams } from "react-router-dom"; // Link for navigation
import { getApihandler } from "../../Apihandler"; // Custom function to call GET API
import Header from "../../layout/header"; // Reusable header component
import Footer from "../../layout/footer"; // Reusable footer component
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material"; // Material UI components

const UserEvents = () => {
  const [events, setEvents] = useState([]); // State to hold list of fetched events
  const [error, setError] = useState(null); // State to hold any error messages
  const location = useLocation(); // Hook to get current URL (used for query params)

  // useEffect will trigger whenever the query string in the URL changes
  useEffect(() => {
    getEvents(); // Fetch events based on current query params
  }, [location.search]);

  // Function to fetch events from the API based on query parameters
  const getEvents = async () => {
    try {
      const searchParams = new URLSearchParams(location.search); // Parses the URL query string
      const categoryname = searchParams.get("category_name"); // Get category from query string
      const city = searchParams.get("city"); // Get city from query string
      const eventdate = searchParams.get("event_date"); // Get event date from query string

      // Build a query string by adding available filters
      const queryString = [
        categoryname ? `category_name=${encodeURIComponent(categoryname)}` : "",
        city ? `city=${encodeURIComponent(city)}` : "",
        eventdate ? `event_date=${encodeURIComponent(eventdate)}` : "",
      ]
        .filter(Boolean) // Remove any empty strings
        .join("&"); // Join all filters with &

      // Call the backend API using the custom GET handler
      const res = await getApihandler(`/searchEvents?${queryString}`);
      console.log("search API response -->", res);

      // Store the fetched events in state (or empty array if no data)
      setEvents(res?.data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      // Set error message in state
      setError(
        error?.message || "Failed to fetch events. Please try again later."
      );
    }
  };

  return (
    <>
      <Header /> {/* Top header */}

      {/* Container for all event cards */}
      <Grid container spacing={3} justifyContent="center">
        {events.length > 0 ? (
          // If events are found, loop through and display each one
          events.map((event) => (
            <Grid item key={event._id} xs={12} sm={6} md={4} lg={3}>
              {/* Wrap card in a Link to the event details page */}
              <Link
                to={`/eventdetails/${event._id}`}
                style={{ textDecoration: "none" }}
              >
                <Card className="mt-5 mb-5">
                  {/* Event image */}
                  <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:80/uploads/${event.photoUrl}`}
                    alt={event.event_name}
                  />
                  <CardContent>
                    {/* Event name */}
                    <Typography variant="h6">{event.event_name}</Typography>

                    {/* Event location */}
                    <Typography variant="body2" color="textSecondary">
                      {event.city}, {event.state}, {event.country}
                    </Typography>

                    {/* Ticket prices */}
                    <Typography variant="body2" fontWeight="bold">
                      Standard Price: ₹{event.standard_price || 0}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      VIP Price: ₹{event.vip_price || 0}
                    </Typography>

                    {/* Category and address */}
                    <Typography variant="body2" color="primary">
                      Category: {event.category_name}
                    </Typography>
                    <Typography variant="body2">
                      Event Address: {event.event_address}
                    </Typography>

                    {/* Start and end time */}
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
          // Show message if no events are found
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

      <Footer /> {/* Bottom footer */}
    </>
  );
};

export default UserEvents; // Export the component to be used in routes or other files
