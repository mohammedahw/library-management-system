const pool = require("../config/database");
const queries = require("./queires");

const getBooks = (req, res) => {
  pool.query(queries.getBooks, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getBooksByGenre = (req, res) => {
  const genre = req.params.genre;
  pool.query(queries.getBooksByGenre, [genre], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addBook = (req, res) => {
  console.log(req.body.name);
  const { id, name, author, genre } = req.body;
  // checking if the book exists
  pool.query(queries.checkBook, [name], (error, results) => {
    if (results.rows.length) {
      res.send("book already exists");
    }
  });
  //add book to database
  pool.query(queries.addBook, [name, author, genre], (error, results) => {
    if (error) throw error;
  });
};

module.exports = { getBooks, getBooksByGenre, addBook };
