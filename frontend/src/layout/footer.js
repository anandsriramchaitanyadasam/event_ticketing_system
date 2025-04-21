import React from "react";
import "./Footer.css"; // Importing custom footer styles
import event from "../Images/event.jpg"; // Gallery image 1
import event1 from "../Images/event1.jpg"; // Gallery image 2

// Predefined categories
const categories = ["Business", "Concert", "Conference", "Festival", "Sport", "Travel"];

// Predefined tags for events
const tags = [
  "Business", "Conference", "Festival", "Festival Theme",
  "Game", "Happy", "Marketing", "Marries",
  "Phanxipang", "Rugby", "Summer", "Technology",
  "Toronto Concert", "Tour", "Tourist"
];

// Gallery image array (can be dynamic in future)
const galleryImages = [event, event1, event];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Section: Categories */}
        <div className="footer-section">
          <h3>All Categories</h3>
          <div className="underline"></div>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>

        {/* Section: Gallery */}
        <div className="footer-section">
          <h3>Our Gallery</h3>
          <div className="underline"></div>
          <div className="gallery">
            {galleryImages.map((image, index) => (
              <img key={index} src={image} alt="Gallery" />
            ))}
          </div>
          <p className="all-gallery">All Gallery</p>
        </div>

        {/* Section: Tags */}
        <div className="footer-section">
          <h3>Tag Event</h3>
          <div className="underline"></div>
          <div className="tags">
            {tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
