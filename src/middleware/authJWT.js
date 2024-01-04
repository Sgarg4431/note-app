const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, jwtConfig.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.body.c = decoded.email;
    next();
  });
};

const authJwt = {
  verifyToken,
};
module.exports = authJwt;
