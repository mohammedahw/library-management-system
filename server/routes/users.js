import express from "express";
import { authenticateToken } from "../middleware/authorization.js";
import { createUser, getUsers } from "../utils/controller.js";

export const usersRouter = express.Router();

usersRouter.get("/", authenticateToken, getUsers);

usersRouter.post("/", createUser);
