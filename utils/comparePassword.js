const bcrypt = require("bcryptjs");

const comparePassword = (password, hashedPasswrod) => {
  return bcrypt.compare(password, hashedPasswrod);
};

module.exports = comparePassword;
