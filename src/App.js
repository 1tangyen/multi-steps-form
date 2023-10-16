import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  CssBaseline,
  Drawer,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import FormContainer from "./FormContainer";
import Status from "./Status";
import MainPage from "./MainPage";

function App() {
  const navItems = ["Request", "Check"];
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <img src="./logo.png" alt="Logo" style={{ marginBottom: "16px" }} />
      <Typography variant="h6" sx={{ marginBottom: "16px" }}>
        Blackcat Restaurant
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton component={Link} to={`/${item.toLowerCase()}`}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Router>
      <Box>
        <CssBaseline />
        <nav>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawerPaper": { boxSizing: "border-box" },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box
          component="main"
          sx={{
            backgroundColor: "#83BCA9",
            height: "100vh",
            padding: "20px",
          }}
        >
          <Routes>
            <Route path="/request" element={<FormContainer />} />
            <Route path="/check" element={<Status />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
