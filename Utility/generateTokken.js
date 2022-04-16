const jwt = require("jsonwebtoken");

const generateTokken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3600s", //Token expires in 1hr
  });
};

module.exports = generateTokken;
