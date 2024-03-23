import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Image from "./../../../assets/image/bimetri_logo_yeni_web_transparent.png";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <Navbar
      expand="lg"
      className="bg-info"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        alignItems: "flex-start",
      }}
    >
      <Container className="text-center text-white">
        <Navbar.Brand
          as={Link}
          to="/"
          active={pathname === "/"}
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img
            src={Image}
            alt="Description"
            style={{ maxWidth: "100%", height: "auto", maxHeight: "30px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/students"
              active={pathname === "/students"}
            >
              Student
            </Nav.Link>
            <Nav.Link as={Link} to="/courses" active={pathname === "/courses"}>
              Course
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
