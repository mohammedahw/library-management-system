import { localPool } from "../config/database.js";
import {
  selectBookByAuthor,
  selectBooksByGenre,
  selectBooks,
  selectUsers,
} from "./queires.js";

export const getBooks = (_, res) => {
  localPool.query(selectBooks, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

export const getBooksByGenre = (req, res) => {
  const genre = req.params.genre;
  localPool.query(selectBooksByGenre, [genre], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

export const getBookByAuthor = (req, res) => {
  const author = req.params.author;
  localPool.query(selectBookByAuthor, [author], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

export const getUsers = (req, res) => {
  localPool.query(selectUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
