export const selectBooks = "SELECT * FROM Books";
export const selectBooksByGenre = "SELECT * FROM Books WHERE genre = $1";
export const slectCheckBook = "SELECT s FROM Books s WHERE s.book_name = $1";
export const selectBookByAuthor = "SELECT * FROM Books WHERE author = $1";
