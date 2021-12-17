import jwt from "jsonwebtoken";

export const authenticateToken = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({ error: "Null token" });
  jwt.verify(token, process.env.ACEESS_TOKEN_SECERT, (error, user) => {
    if (error) return res.status(403).json({ error: error });
    req.user = user;
    next();
  });
};
