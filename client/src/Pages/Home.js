import React, { useContext } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { useEffect, useReducer } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { userContext } from "../Helper/User";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const initialState = {
  loading: true,
  error: "",
  books: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        error: "",
        books: action.payload,
      };
    case "FETCH_ERROR":
      return {
        loading: true,
        error: "gg",
        books: {},
      };
    default:
      return state;
  }
};

export const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loggedIn, setLoggedIn } = useContext(userContext);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((response) => {
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      })
      .catch(() => {
        dispatch({ type: "FETCH_ERROR" });
      });
  }, []);
  return (
    <>
      <Navbar main={true} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          rowSpacing={1}
          columns={{ xs: 4, sm: 8, md: 12 }}
          spacing={{ xs: 2, md: 3 }}
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "50vh" }}
        >
          {state.loading
            ? "lodaing"
            : state.books.map((book) => {
                const { id, book_name, author, description, genre, img } = book;
                return (
                  <Grid item xs={2} sm={4} md={4} key={id} sx={{ my: 5 }}>
                    <Item
                      sx={{
                        maxWidth: 345,
                        backgroundColor: "black",
                        mx: "auto",
                      }}
                    >
                      <Card
                        sx={{
                          maxWidth: 345,
                          color: "white",
                          backgroundColor: "black",
                        }}
                      >
                        <CardMedia component="img" height="300" image={img} />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {book_name}
                          </Typography>
                          <Typography variant="body2">{description}</Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small">{genre}</Button>
                          <Button size="small">{author}</Button>
                        </CardActions>
                      </Card>
                    </Item>
                  </Grid>
                );
              })}
        </Grid>
      </Box>
    </>
  );
};
