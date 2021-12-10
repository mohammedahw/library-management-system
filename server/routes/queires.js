const getBooks = "SELECT * FROM Books";
const getBooksByGenre = "SELECT * FROM Books WHERE Genre = $1";
const checkBook = "SELECT n FROM Books n WHERE n.Name = $1";

module.exports = { getBooks, getBooksByGenre, checkBook };
