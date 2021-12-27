import React from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { useEffect, useReducer, useContext } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import { BookCard } from "../components/BookCard";
import { userContext } from "../Helper/User";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function FlexItem(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        p: 1,
        m: 1,
        borderRadius: 1,
        textAlign: "center",
        fontSize: "1rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

const initialState = {
  loading: true,
  error: "",
  books: {},
};

const GENRES = ["All", "Fiction", "Sci-fi", "Novel", "Textbook", "Thriller"];

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
    case "FILTER":
      const filterdBooks = state.books.filter(
        (book) => book.genre === action.payload
      );
      return {
        loading: false,
        error: "",
        books: filterdBooks,
      };

    default:
      return state;
  }
};

export const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useContext(userContext);

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

  const handleFilter = async (genre) => {
    // eslint-disable-next-line
    const books = await axios
      .get("http://localhost:5000/api/books")
      .then((response) => {
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      });
    if (genre === "All") return;
    dispatch({ type: "FILTER", payload: genre });
  };

  const handleLike = (email, book_name, author, genre, img) => {
    axios.post("http://localhost:5000/api/user_data", {
      email,
      book_name,
      author,
      genre,
      img,
    });
  };

  return (
    <>
      <Navbar main={true} />
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            p: 1,
            bgcolor: "background.paper",
            border: "solid black",
          }}
        >
          {GENRES.map((genre, idx) => {
            return (
              <Button
                key={idx}
                sx={{ flexGrow: 1 }}
                style={{ marginLeft: "auto", marginRight: "auto" }}
                onClick={() => handleFilter(genre)}
              >
                <FlexItem sx={{ order: idx + 1 }}>
                  <Typography
                    variant="body2"
                    component="div"
                    fontWeight="bold"
                    style={{ textTransform: "capitalize" }}
                  >
                    {genre}
                  </Typography>
                </FlexItem>
              </Button>
            );
          })}
        </Box>
      </div>
      <Box sx={{ flexGrow: 1, flexDirection: "row" }}></Box>
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
          {state.loading ? (
            <Box>
              <CircularProgress />
            </Box>
          ) : (
            state.books.map((book) => {
              const { id, book_name, author, genre, img } = book;
              return (
                <BookCard
                  main={true}
                  key={id}
                  book_name={book_name}
                  author={author}
                  img={img}
                  genre={genre}
                  like={() =>
                    handleLike(user.userEmail, book_name, author, genre, img)
                  }
                />
              );
            })
          )}
        </Grid>
      </Box>
    </>
  );
};
