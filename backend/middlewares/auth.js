const jwt = require("jsonwebtoken");
exports.isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Invalid Token" });
      }

      req.user = decoded;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: "Token is not supplied." });
  }
};
