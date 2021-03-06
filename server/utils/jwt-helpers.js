import jwt from "jsonwebtoken";

const jwtTokens = ({ user_id, user_email }) => {
  const user = { user_id, user_email };
  const accesToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECERT, {
    expiresIn: "2m",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECERT, {
    expiresIn: "14d",
  });
  return { accesToken, refreshToken };
};

export { jwtTokens };
