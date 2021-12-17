export const selectBooks = "SELECT * FROM Books";
export const selectBooksByGenre = "SELECT * FROM Books WHERE genre = $1";
export const selectBookByAuthor = "SELECT * FROM Books WHERE author = $1";
export const selectUsers = "SELECT * FROM USERS";
export const insertUser =
  "INSERT INTO USERS ( user_email, user_password) values ($1,$2) RETURNING *";
export const checkUser = "SELECT * FROM USERS WHERE user_email = $1";