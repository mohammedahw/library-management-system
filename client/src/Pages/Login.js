import { Button, Box, Grid, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Navbar } from "../components/Navbar";
import { userContext } from "../Helper/User";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(userContext);

  const handleLogin = async () => {
    if (!email) {
      alert("please enter your email");
      return;
    }
    if (!password) {
      alert("please enter your password");
      return;
    }
    try {
      const results = await axios.post("http://localhost:5000/api/auth", {
        email,
        password,
      });
      setUser({
        userEmail: email,
        loggedIn: true,
      });
      Cookies.set("refresh_token", results.data.refreshToken);
      localStorage.setItem("email", email);
    } catch (err) {
      alert("invalid nformation");
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
              hiddenLabel
              id="filleed-hidden-label-small"
              variant="filled"
              size="small"
              placeholder="email"
              sx={{ my: "auto", backgroundColor: "#EEEDE7" }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              hiddenLabel
              id="filleed-hidden-label-small"
              variant="filled"
              size="small"
              placeholder="password"
              type="password"
              sx={{ backgroundColor: "#EEEDE7" }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>
              <Typography
                variant="h6"
                component="div"
                style={{ textTransform: "capitalize" }}
              >
                Login
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
              Dont have an account?
            </Typography>
            <Link
              to="/register"
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
                  Sign Up
                </Typography>
              </Button>
            </Link>
          </Stack>
        </Grid>
      </Box>
    </>
  );
};
