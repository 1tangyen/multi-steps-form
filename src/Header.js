import React from "react";
import logo from "./logo.png";
import { Navbar, Container, Row, Col } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <Row>
            <Col>
              <img
                src={logo}
                alt="Logo"
                height="50"
                className="d-inline-block align-top me-3"
              />
            </Col>
            <Col>
              <h4>Black Cat Restaurant Review</h4>
            </Col>
          </Row>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
