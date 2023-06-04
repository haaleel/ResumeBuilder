import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css"; 

const Home = () => {
  return (
    <div className="cool-background">
      <NavBar />
      <Container>
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                height={500}
                src="https://imgv3.fotor.com/images/side/resume.jpg"
                alt="Carousel 1"
                className="d-block w-100"
              />
            </div>
          </div>
        </div>
      </Container>

      <br />
      <br />
      <main style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        <Button as={Link} to="/Resume" variant="primary">
          Create a Resume
        </Button>
      </main>
    </div>
  );
};

export default Home;
