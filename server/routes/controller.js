import { pool } from "../config/database.js";
import {
  selectBookByAuthor,
  selectBooksByGenre,
  selectBooks,
} from "./queires.js";

export const getBooks = (_, res) => {
  pool.query(selectBooks, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

export const getBooksByGenre = (req, res) => {
  const genre = req.params.genre;
  pool.query(selectBooksByGenre, [genre], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

export const getBookByAuthor = (req, res) => {
  const author = req.params.author;
  pool.query(selectBookByAuthor, [author], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
