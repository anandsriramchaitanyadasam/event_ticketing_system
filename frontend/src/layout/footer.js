import React from "react";
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
