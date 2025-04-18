// Importing necessary libraries and files
import React from "react"; // React library for component creation
import "./FeaturedEvents.css"; // Importing custom CSS for styling
import event from "../../Images/event.jpg"; // Importing event image 1
import event1 from "../../Images/event1.jpg"; // Importing event image 2

// Static event data array to display featured events
const events = [
  {
    id: 1, // Unique ID for the event
    date: "MAR", // Month of the event
    day: "30-2026", // Specific day of the event
    title: "Lorem", // Title of the event
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mae...", // Description of the event
    location: "South Street Seaport...", // Location of the event
    price: "$10–$30", // Price range for the event (could be empty)
    image: event, // Event image
  },
  {
    id: 2,
    date: "DEC",
    day: "1-2026",
    title: "Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mae...",
    location: "Broadway 473 Broadwa...",
    price: "",
    image: event1,
  },
  {
    id: 3,
    date: "DEC",
    day: "31-2026",
    title: "Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mae...",
    location: "795 Pine St, New Yor...",
    price: "",
    image: event1,
  },
];

// FeaturedEvents functional component
const FeaturedEvents = () => {
  return (
    // Main container for featured events section
    <div className="featured-container">
      {/* Title of the featured events section */}
      <h2 className="featured-title">FEATURED EVENTS</h2>
      
      {/* Subtitle explaining the featured events */}
      <p className="featured-subtitle">
        You can choose to display Featured, Upcoming, Past Events here
      </p>

      {/* Grid container to display event cards */}
      <div className="event-grid">
        {/* Mapping over the events array to render individual event cards */}
        {events.map((event) => (
          <div key={event.id} className="event-card"> {/* Each event card */}
            {/* Event image */}
            <img src={event.image} alt={event.title} className="event-image" />
            
            {/* Event date container */}
            <div className="event-date">
              <span className="month">{event.date}</span> {/* Event month */}
              <span className="day">{event.day}</span> {/* Event day */}
            </div>

            {/* Event details container */}
            <div className="event-details">
              {/* Event title */}
              <h3 className="event-title">{event.title}</h3>
              {/* Event description */}
              <p className="event-description">{event.description}</p>
              {/* Event location with a map pin emoji */}
              <p className="event-location">📍 {event.location}</p>
              
              {/* Event footer with ticket button and price (if available) */}
              <div className="event-footer">
                <button className="ticket-button">Get Ticket</button> {/* Button to get ticket */}
                {event.price && <span className="event-price">{event.price}</span>} {/* Display event price if available */}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Button to view all events */}
      <button className="all-events-button">All Events</button>
    </div>
  );
};

// Exporting the FeaturedEvents component to be used in other parts of the app
export default FeaturedEvents;
