import React from "react";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { BookCard } from "../components/BookCard";
import { Grid } from "@mui/material";

export const UserPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user_data", { withCredentials: true })
      .then((res) => {
        setLoading(false);
        setBooks(res.data);
      });
  }, []);

  const handleRemove = (book_name) => {
    const filterdBooks = books.filter((book) => book.book_name !== book_name);
    axios.delete("http://localhost:5000/api/user_data", {
      data: { book_name: book_name },
    });
    setBooks(filterdBooks);
  };

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
          books.map((book, idx) => {
            return (
              <BookCard
                main={false}
                key={idx}
                book_name={book.book_name}
                author={book.author}
                genre={book.genre}
                img={book.img}
                remove={() => handleRemove(book.book_name)}
              />
            );
          })
        )}
      </Grid>
    </>
  );
};
