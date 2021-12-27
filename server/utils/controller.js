import { localPool, pool } from "../config/database.js";
import {
  selectBookByAuthor,
  selectBooksByGenre,
  selectBooks,
  selectUsers,
  insertUser,
  checkUser,
  selectUsersData,
  insertUserData,
} from "./queires.js";
import bcrypt from "bcrypt";
import { jwtTokens } from "./jwt-helpers.js";
import jwt from "jsonwebtoken";

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
    res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
    res.cookie("email", email);
    res.json({
      accesToken: tokens.accesToken,
      refreshToken: tokens.refreshToken,
      id: users.rows[0].user_id,
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const getAuth = (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (refreshToken === null)
      return res.status(401).json({ error: "Null refresh token" });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECERT,
      (error, user) => {
        if (error) return res.status(403).json({ error: error.message });
        let tokens = jwtTokens(user);
        res.json(tokens);
      }
    );
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const delAuth = (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({ message: "refresh token deleted." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getUsersData = (req, res) => {
  try {
    const email = req.cookies.email;
    localPool.query(selectUsersData, [email], (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  } catch (error) {
    res.status(500).json({ error: err });
  }
};

export const insertIntoUserData = async (req, res) => {
  try {
    const results = await localPool.query(insertUserData, [
      req.body.email,
      req.body.book_name,
      req.body.author,
      req.body.description,
      req.body.genre,
      req.body.img,
    ]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
