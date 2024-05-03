const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  //   const token = req.headers["token"];

  const token = req.query.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(
    token,
    "your-secret-key-youcanothackme2232323@*#*###",
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
      req.hamzaId = decoded.userId;
      req.adminPrevillageEmail = decoded.email;
      next();
    }
  );
};

module.exports = authenticateToken;
