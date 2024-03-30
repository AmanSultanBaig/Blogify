const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const compateHashedPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const generateAuthToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "12h" });
};

const checkAuthToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = {
  validateEmail,
  hashPassword,
  compateHashedPassword,
  generateAuthToken,
  checkAuthToken
};
