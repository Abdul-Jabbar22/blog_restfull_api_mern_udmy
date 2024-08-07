const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = {};

  if (!errors.isEmpty()) {
    errors.array().map((error) => {
      mappedErrors[error.param] = error.msg; // Use `error.param` instead of `error.path`
    });

    return res.status(400).json(mappedErrors); // Send the response and return to prevent further code execution
  }

  next(); // Continue to the next middleware or route handler if no errors
};

module.exports = validate;
