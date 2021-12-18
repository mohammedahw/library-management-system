import express from "express";
import { delAuth, getAuth, login } from "../utils/controller.js";

export const authRouter = express.Router();

authRouter.post("/", login);
authRouter.get("/refresh_token", getAuth);
authRouter.delete("/refresh_token", delAuth);
