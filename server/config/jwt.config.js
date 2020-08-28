const jwt = require('jsonwebtoken');
const myFirstSecret = process.env.FIRST_SECRET_KEY;

module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, myFirstSecret, (err, payload) => {
    if (err) {
      res.status(401).json({ verified: false });
    } else {
      next();
    }
  });
};
