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
const signinValidator = [
  check("email")
    .isEmail()
    .withMessage("invalid email")
    .notEmpty()
    .withMessage("email is required"),
  check("password").notEmpty().withMessage("password is required"),
];
const emailValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("Email is required"),
];

module.exports = { singupValidator, signinValidator, emailValidator };
