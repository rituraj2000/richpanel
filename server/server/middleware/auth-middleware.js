const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret");
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("HIT");
    res.send({
      message: error.message,
      success: false,
    });
  }
};
