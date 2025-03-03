import React from "react";
import Carousel from "react-bootstrap/Carousel";
import sliderimg1 from "../../Images/plantbanner.avif";
import sliderimg2 from "../../Images/plantbanner1.avif";
import sliderimg3 from "../../Images/plantbanner2.jpg";
import Container from "react-bootstrap/Container";
export default function Banner() {
  return (
    <>
      <section>
        <Container className="mt-5">
          <Carousel>
            <Carousel.Item>
              {/* <ExampleCarouselImage text="First slide" /> */}
              <img src={sliderimg1} />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              {/* <ExampleCarouselImage text="Second slide" /> */}
              <img src={sliderimg2} />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            {/* <Carousel.Item>
           
            <img src={sliderimg3} width="100%" />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item> */}
          </Carousel>
        </Container>
      </section>
    </>
  );
}
