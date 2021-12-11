import express from "express";
import { getBooks, getBooksByGenre, getBookByAuthor } from "./controller.js";

export const router = express.Router();

router.get("/", getBooks);
router.get("/genres/:genre", getBooksByGenre);
router.get("/authors/:author", getBookByAuthor);
