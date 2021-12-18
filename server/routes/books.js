import express from "express";
import {
  getBooks,
  getBooksByGenre,
  getBookByAuthor,
} from "../utils/controller.js";

export const bookRouter = express.Router();

bookRouter.get("/", getBooks);
bookRouter.get("/genres/:genre", getBooksByGenre);
bookRouter.get("/authors/:author", getBookByAuthor);
