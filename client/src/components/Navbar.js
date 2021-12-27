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
import { useContext } from "react";
import { userContext } from "../Helper/User";
import Cookies from "js-cookie";

export const Navbar = ({ main }) => {
  const { user, setUser } = useContext(userContext);

  const handleLogOut = () => {
    Cookies.remove("email");
    Cookies.remove("id");
    Cookies.remove("refresh_token");
    setUser({ email: "", loggedIn: false });
    return;
  };

  return (
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
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Button variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ textTransform: "capitalize" }}
                >
                  Home
                </Typography>
              </Button>
            </Link>
          </Button>
          {user.loggedIn && (
            <Link
              to={`/users/${Cookies.get("id")}`}
              underline="none"
              color="white"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button style={{ color: "white" }}>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ textTransform: "capitalize" }}
                >
                  Your Library
                </Typography>
              </Button>
            </Link>
          )}
          {main && !user.loggedIn && (
            <Button sx={{ ml: "auto", textTransform: "capitalize" }}>
              <Link
                to="/login"
                underline="none"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ textTransform: "capitalize" }}
                  >
                    Login
                  </Typography>
                </Button>
              </Link>
            </Button>
          )}
          {user.loggedIn && main && (
            <>
              <Button sx={{ ml: "auto" }} style={{ color: "white" }}>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ textTransform: "lowercase" }}
                >
                  {user.userEmail}
                </Typography>
              </Button>
              <Button style={{ color: "red" }} onClick={handleLogOut}>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ textTransform: "capitalize" }}
                >
                  Logout
                </Typography>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
