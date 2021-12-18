import { localPool, pool } from "../config/database.js";
import {
  selectBookByAuthor,
  selectBooksByGenre,
  selectBooks,
  selectUsers,
  insertUser,
  checkUser,
} from "./queires.js";
import bcrypt from "bcrypt";
import { jwtTokens } from "./jwt-helpers.js";

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

export const getUsers = (_, res) => {
  localPool.query(selectUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

export const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await localPool.query(insertUser, [
      req.body.email,
      hashedPassword,
    ]);
    res.status(200).json(newUser.rows[0]);
  } catch (error) {
    res.status(500).json("server error");
  }
};

export const login = async (req, res) => {
  console.log(req.headers);
  try {
    const { email, password } = req.body;
    const users = await localPool.query(checkUser, [email]);
    // email check
    if (users.rows.length === 0)
      return res.status(401).json({ error: "Email is incorecct!" });
    // password check
    const validPassword = await bcrypt.compare(
      password,
      users.rows[0].user_password
    );
    if (!validPassword)
      return res.status(404).json({ error: "Incorrect password" });
    let tokens = jwtTokens(users.rows[0]);
    res.json(tokens);
    res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const getAuth = (req, res) => {
  try {
    const refreshToken = req.cookie.refresh_token;
    console.log(refreshToken);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
