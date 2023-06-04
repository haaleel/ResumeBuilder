import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Image from 'react-bootstrap/Image';

const NavBar = () => {

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Resume Builder
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
            <Image 
            height={50}
            src="https://cdn4.iconfinder.com/data/icons/people-of-medical-education-and-science/512/People_Medical_Education_Science_nerd_man-512.png" roundedCircle />        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
