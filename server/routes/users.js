import express from "express";
import { getUsers } from "./controller.js";

export const usersRouter = express.Router();

usersRouter.get("/", getUsers);
