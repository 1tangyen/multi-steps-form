import React from "react";
import "./App.css";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Box, Typography, Container } from "@mui/material";

import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Logo from "./logo.png";

export default function MainPage() {
  return (
    <Box sx={{ height: "100vh", overflow: "hidden" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        position="sticky"
        sx={{ backgroundColor: "#83BCA9", boxShadow: "none" }}
      >
        <Toolbar sx={{ justifyContent: "flex-start" }}>
          <img
            src={Logo}
            alt="Your Logo"
            height="60"
            style={{ marginRight: "auto" }}
          />
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "calc(100vh - 64px)",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <Row className="justify-content-center align-items-center">
          <Col xs={12} sm={6} style={{ position: "relative" }}>
            <Typography variant="h4" gutterBottom>
              Black
            </Typography>
            <Typography variant="h4" gutterBottom>
              Cat
            </Typography>
            <Typography variant="h4" gutterBottom>
              Restaurant
            </Typography>
            <Typography paragraph>Company Info</Typography>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/request"
                sx={{ marginRight: 2 }}
              >
                Request Report
              </Button>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/check"
              >
                Check Status
              </Button>
            </Box>
          </Col>
          <Col xs={12} sm={6} style={{ textAlign: "right" }}>
            <img
              src={Logo}
              alt="store pic"
              loading="lazy"
              // style={{
              //   position: "flex",
              //   right: 0,
              //   // Making the right side of the image a half circle
              //   clipPath: "circle(80% at 100% 50%)",
              //   height: "100%",
              //   width: "auto",
              // }}
            />
          </Col>
        </Row>
      </Box>
    </Box>
  );
}
