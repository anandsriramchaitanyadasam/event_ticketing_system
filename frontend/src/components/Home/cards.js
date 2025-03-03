import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import plant1 from "../../Images/plant1.avif";
import plant2 from "../../Images/plant2.avif";
import plant3 from "../../Images/plant3.avif";
import plant4 from "../../Images/plant4.avif";
export default function Cards() {
  return (
    <>
      <Container className="mt-5">
        <h5>Plants For Gifts</h5>
        <Row className="mt-5">
          <Col md={3}>
            <div>
              <img
                src={plant1}
                style={{ borderRadius: "20px", width: "100%" }}
              />
            </div>
            <h5 className="mt-3">Money Plants</h5>
          </Col>
          <Col md={3}>
            <div>
              <img
                src={plant2}
                style={{ borderRadius: "20px", width: "100%" }}
              />
            </div>
            <h5 className="mt-3">Air Purifying Plants</h5>

          </Col>
          <Col md={3}>
            <div>
              <img
                src={plant3}
                style={{ borderRadius: "20px", width: "100%" }}
              />
            </div>
            <h5 className="mt-3">Plants for Decor</h5>
          </Col>
          <Col md={3}>
            <div>
              <img
                src={plant4}
                style={{ borderRadius: "20px", width: "100%" }}
              />
            </div>
            <h5 className="mt-3">Lucky Plants</h5>
          </Col>
        </Row>
      </Container>
    </>
  );
}
