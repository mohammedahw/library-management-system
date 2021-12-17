import express from "express";
import { getAuth, login } from "./controller.js";

export const authRouter = express.Router();

authRouter.post("/", login);
authRouter.get("/refresh_token", getAuth);
