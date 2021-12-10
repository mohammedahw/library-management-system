const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/database");

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendStatus(200);
});

//routes
app.use("/books", require("./routes/books"));

app.listen(5000);
