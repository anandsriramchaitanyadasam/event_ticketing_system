import React from "react";
import "./FeaturedEvents.css";
import event from "../../Images/event.jpg"
import event1 from "../../Images/event1.jpg"
const events = [
  {
    id: 1,
    date: "MAR",
    day: "30-2026",
    title: "Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mae...",
    location: "South Street Seaport...",
    price: "$10–$30",
    image: event
  },
  {
    id: 2,
    date: "DEC",
    day: "1-2026",
    title: "Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mae...",
    location: "Broadway 473 Broadwa...",
    price: "",
    image: event1
  },
  {
    id: 3,
    date: "DEC",
    day: "31-2026",
    title: "Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mae...",
    location: "795 Pine St, New Yor...",
    price: "",
    image: event1
  }
];

const FeaturedEvents = () => {
  return (
    <div className="featured-container">
      <h2 className="featured-title">FEATURED EVENTS</h2>
      <p className="featured-subtitle">
        You can choose to display Featured, Upcoming, Past Events here
      </p>
      <div className="event-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <img src={event.image} alt={event.title} className="event-image" />
            <div className="event-date">
              <span className="month">{event.date}</span>
              <span className="day">{event.day}</span>
            </div>
            <div className="event-details">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
              <p className="event-location">📍 {event.location}</p>
              <div className="event-footer">
                <button className="ticket-button">Get Ticket</button>
                {event.price && <span className="event-price">{event.price}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="all-events-button">All Events</button>
    </div>
  );
};

export default FeaturedEvents;
