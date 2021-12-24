import {
  Button,
  Box,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import { Link } from "react-router-dom";
import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useRef } from "react";

export const Register = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleLogin = () => {
    return;
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#161b22" }}>
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
          </Toolbar>
        </AppBar>
      </Box>
      <Box flexGrow={1}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "50vh" }}
        >
          <Stack
            component="form"
            sx={{ width: "35ch", backgroundColor: "#030b1a" }}
            spacing={1}
            autoComplete="off"
          >
            <TextField
              hiddenLabel
              id="filleed-hidden-label-small"
              variant="filled"
              size="small"
              placeholder="email"
              ref={emailRef}
              sx={{ my: "auto", backgroundColor: "#EEEDE7" }}
            />
            <TextField
              ref={passwordRef}
              hiddenLabel
              id="filleed-hidden-label-small"
              variant="filled"
              size="small"
              type="password"
              placeholder="password"
              sx={{ backgroundColor: "#EEEDE7" }}
            />
            <TextField
              ref={confirmPasswordRef}
              hiddenLabel
              id="filleed-hidden-label-small"
              variant="filled"
              size="small"
              type="password"
              placeholder="confirm password"
              sx={{ backgroundColor: "#EEEDE7" }}
            />
            <Button onClick={handleLogin}>Register</Button>
            <Typography
              variant="h6"
              style={{
                alignItems: "center",
                textAlgin: "center",
                color: "#00FFD8",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            >
              Already have an acacount?
            </Typography>
            <Link
              to="/login"
              underline="none"
              style={{
                textDecoration: "none",
                color: "white",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Button>Sign In</Button>
            </Link>
          </Stack>
        </Grid>
      </Box>
    </>
  );
};
