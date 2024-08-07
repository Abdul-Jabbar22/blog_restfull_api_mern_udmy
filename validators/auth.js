const { check } = require("express-validator");

const singupValidator = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be 6 char ling")
    .notEmpty()
    .withMessage("Password is required"),
];

module.exports = { singupValidator };
