import React from "react";
<<<<<<< HEAD
import "./Footer.css";
import event from "../Images/event.jpg"
import event1 from "../Images/event1.jpg"

const categories = ["Business", "Concert", "Conference", "Festival", "Sport", "Travel"];
const tags = [
  "Business", "Conference", "Festival", "Festival Theme",
  "Game", "Happy", "Marketing", "Marries",
  "Phanxipang", "Rugby", "Summer", "Technology",
  "Toronto Concert", "Tour", "Tourist"
];
const galleryImages = [
  event,
  event1,
  event
  
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Categories Section */}
        <div className="footer-section">
          <h3>All Categories</h3>
          <div className="underline"></div>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>

        {/* Gallery Section */}
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

        {/* Tag Events Section */}
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
=======
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function Footer() {
  return (
    <>
      <footer style={{ backgroundColor: "#008000" }}>
        <Container>
          <Row>
            <Col md={3}>
              <h6>About Us</h6>
              <ul style={{listStyleType:"none"}}>
                <li>Lorem</li>
                <li>Lorem</li>
                <li>Lorem</li>
                <li>Lorem</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
