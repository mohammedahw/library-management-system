import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { BookCard } from "../components/BookCard";
import { Grid } from "@mui/material";

export const AuthorPage = () => {
  const { name } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/authors/${name}`).then((res) => {
      setBooks(res.data);
      setLoading(false);
    });
  });

  return (
    <>
      <Navbar main={true} />
      <Grid
        container
        rowSpacing={1}
        columns={{ xs: 4, sm: 8, md: 12 }}
        spacing={{ xs: 2, md: 3 }}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "50vh" }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          books.map((book) => {
            const { id, book_name, author, genre, img } = book;
            return (
              <BookCard
                key={id}
                main={true}
                book_name={book_name}
                author={author}
                genre={genre}
                img={img}
              />
            );
          })
        )}
      </Grid>
    </>
  );
};
