import React from "react";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { BookCard } from "../components/BookCard";

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
    return;
  };

  return (
    <>
      <Navbar main={true} />
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
    </>
  );
};
