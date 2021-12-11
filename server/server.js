import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookiepParser from "cookie-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { bookRouter } from "./routes/books.js";
import { usersRouter } from "./routes/users.js";

dotenv.config();
const app = express();
const PORT = process.env.PROT || 5000;
const corsOptions = { credentials: true, origin: process.env.URL || "*" };
const __dirname = dirname(fileURLToPath(import.meta.url));

//middleware
app.use(cors());
app.use(json());
app.use(cookiepParser());
app.use("/", express.static(join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendStatus(200);
});

//routes
app.use("/books", bookRouter);
app.use("/users", usersRouter);

app.listen(PORT);
