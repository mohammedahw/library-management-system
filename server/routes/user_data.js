import express from "express";
import { getUsersData, insertIntoUserData } from "../utils/controller.js";

export const userDataRouter = express.Router();

userDataRouter.get("/", getUsersData);
userDataRouter.post("/", insertIntoUserData);
