import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getApihandler } from "../../Apihandler";
import { Card } from "@mui/material";

export default function FourthSec() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPlants();
  }, []);

  const getPlants = async () => {
    const res = await getApihandler("/getPlant");
    console.log("get plants api response --->", res);
    setData(res.data);
  };

  return (
    <Container className="mt-5">
      <h3>All Plants Collection</h3>
      <Row className="mt-5">
        {data.map((plantdata, plantIndex) => (
          <Col md={3}>
            <Card style={{ padding: "10px" }}>
              <div key={plantIndex}>
                {plantdata.photos &&
                  plantdata.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={`http://localhost:80/${photo.replace("\\", "/")}`}
                      alt="Plant"
                      style={{
                        width: "100%",
<<<<<<< HEAD
                     
=======
                        // height: 100,
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
                        marginRight: 10,
                        borderRadius: 5,
                      }}
                    />
                  ))}
              </div>
              <div>
                <h6>{plantdata.plant_name}</h6>
                <p style={{ color: "gray", fontWeight: "600" }}>
                  {plantdata.description}
                </p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
