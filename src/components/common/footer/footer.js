import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  return (
    <Navbar
      expand="lg"
      className="bg-dark"
      style={{ position: "relative", bottom: 0, width: "100%", zIndex: 100 }}
    >
      <Container className="justify-content-center">
        <Navbar.Brand
          as={Link}
          to="https://github.com/nedimkacanofficial"
          active={pathname === "/students"}
          className="text-white"
          target="blank"
        >
          ndmkcn
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Footer;
