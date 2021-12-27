export const selectBooks = "SELECT * FROM Books";
export const selectBooksByGenre = "SELECT * FROM Books WHERE genre = $1";
export const selectBookByAuthor = "SELECT * FROM Books WHERE author = $1";
export const selectUsers = "SELECT * FROM USERS";
export const insertUser =
  "INSERT INTO USERS ( user_email, user_password) values ($1,$2) RETURNING *";
export const checkUser = "SELECT * FROM USERS WHERE user_email = $1";
export const selectUsersData = "SELECT * FROM user_data where user_email = $1";
export const insertUserData =
  "INSERT INTO user_data (user_email, book_name, author, description, genre, img) values ($1, $2, $3, $4, $5, $6) RETURNING *";
export const deleteUserData = "DELETE FROM user_data WHERE book_name = $1";
