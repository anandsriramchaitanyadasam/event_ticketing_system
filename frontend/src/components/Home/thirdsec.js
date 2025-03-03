import React from "react";
import inndoorplant1 from "../../Images/indoor-plant-desktop_1.avif";
import indoorplant2 from "../../Images/outdoor-plant-desktop.avif";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Card } from "@mui/material";

export default function ThirdSec() {
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <Card sx={{ padding: "10px" }}>
              <div>
                <img
                  src={inndoorplant1}
                  style={{ borderRadius: "20px", width: "100%" }}
                />
              </div>

              <div className="d-flex justify-content-between mt-4">
                <div>
                  <h4 style={{ textAlign: "left", color: "#1C2120" }}>
                    Indoor Plants
                  </h4>
                  <p
                    style={{
                      textAlign: "left",
                      color: "#888888",
                      fontWeight: "400",
                    }}
                  >
                    Bring Nature to Your Home{" "}
                  </p>
                </div>
                <div>
                  <Button
                    sx={{
                      backgroundColor: "#0E4D65",
                      color: "white",
                      padding: "10px 30px",
                      borderRadius: "8px",
                      fontWeight: "500",
                    }}
                  >
                    View All
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
          <Col md={6}>
            <Card sx={{ padding: "10px" }}>
              <div>
                <img
                  src={indoorplant2}
                  style={{ borderRadius: "20px", width: "100%" }}
                />
              </div>

              <div className="d-flex justify-content-between mt-4">
                <div>
                  <h4 style={{ textAlign: "left", color: "#1C2120" }}>
                    Outdoor Plants
                  </h4>
                  <p
                    style={{
                      textAlign: "left",
                      color: "#888888",
                      fontWeight: "400",
                    }}
                  >
                    Bring Nature to Your Home{" "}
                  </p>
                </div>
                <div>
                  <Button
                    sx={{
                      backgroundColor: "#0E4D65",
                      color: "white",
                      padding: "10px 30px",
                      borderRadius: "8px",
                      fontWeight: "500",
                    }}
                  >
                    View All
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
