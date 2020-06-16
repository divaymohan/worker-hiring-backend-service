const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send("Access denied, You are not authorized");
  try {
    const decode = jwt.verify(token, "jwtWebToken");
    req.user = decode;
    next();
  } catch {
    return res.status(401).send("Token Not Found For This Account..!!");
  }
};
