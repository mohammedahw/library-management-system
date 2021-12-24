import { Button, Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState, useContext } from "react";
import { Navbar } from "../components/Navbar";
import { userContext } from "../Helper/User";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");
  const { loggedIn, setLoggedIn } = useContext(userContext);

  const handleRegister = () => {
    console.log(email, password, confirmPassowrd);
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
            <Button onClick={handleRegister}>Register</Button>
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
