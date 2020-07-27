const jwt = require("jsonwebtoken");
const { SECRET } = require("../Config");

module.exports = (req, res, next) => {
  let token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "no token ,Authorization denied" });
  }

  try {
    let decoded = jwt.verify(token, SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
