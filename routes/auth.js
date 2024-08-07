const express = require("express");

const router = express.Router();
const { authController } = require("../controller");
const { singupValidator } = require("../validators/auth");
const validate = require("../validators/validate");
router.post("/signup", singupValidator, validate, authController.signup);
module.exports = router;
