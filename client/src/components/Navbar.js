import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

export const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <LibraryBooksIcon />
          </IconButton>
          <Button sx={{ textTransform: "capitalize" }}>
            <Link
              to="/"
              underline="none"
              color="white"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Home
              </Typography>
            </Link>
          </Button>
          <Button sx={{ ml: "auto", textTransform: "capitalize" }}>
            <Link
              to="/login"
              underline="none"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Login
              </Typography>
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
