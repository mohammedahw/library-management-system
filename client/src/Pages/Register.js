import { Button, Box, Grid, Typography } from "@mui/material";
import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState, useContext } from "react";
import { Navbar } from "../components/Navbar";
import { userContext } from "../Helper/User";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");

  // eslint-disable-next-line
  const { user, setUser } = useContext(userContext);

  const handleRegister = async () => {
    if (password !== confirmPassowrd) {
      alert("passwords dont match!");
      return;
    }
    if (!email) {
      alert("please enter your email");
      return;
    }
    try {
      const results = await axios.post("http://localhost:5000/api/users", {
        email: email,
        password: password,
      });
      setUser({ userEmail: email, loggedIn: true });
      Cookies.set("refresh_token", results.data.refreshToken);
      localStorage.setItem("email", email);
    } catch (err) {
      alert("Invalid Information");
    }
  };

  return (
    <>
      <Navbar main={false} />
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
              onChange={(e) => setEmail(e.target.value)}
              hiddenLabel
              id="filleed-hidden-label-small"
              variant="filled"
              size="small"
              placeholder="email"
              sx={{ my: "auto", backgroundColor: "#EEEDE7" }}
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              hiddenLabel
              id="filleed-hidden-label-small"
              variant="filled"
              size="small"
              type="password"
              placeholder="password"
              sx={{ backgroundColor: "#EEEDE7" }}
            />
            <TextField
              onChange={(e) => setConfirmPassword(e.target.value)}
              hiddenLabel
              id="filleed-hidden-label-small"
              variant="filled"
              size="small"
              type="password"
              placeholder="confirm password"
              sx={{ backgroundColor: "#EEEDE7" }}
            />
            <Button onClick={handleRegister}>
              <Typography
                variant="h6"
                component="div"
                style={{ textTransform: "capitalize" }}
              >
                Register
              </Typography>
            </Button>
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
              <Button>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ textTransform: "capitalize" }}
                >
                  Sign In
                </Typography>
              </Button>
            </Link>
          </Stack>
        </Grid>
      </Box>
    </>
  );
};
