const express = require("express");

const router = express.Router();
const { authController } = require("../controller");
const {
  singupValidator,
  signinValidator,
  emailValidator,
  verifyUserValidator,
  recoverPasswordValidator,
  changePassword,
  changePasswordValidator,
} = require("../validators/auth");
const validate = require("../validators/validate");
const isAuth = require("../middlewares/isAuth");
router.post("/signup", singupValidator, validate, authController.signup);
router.post("/signin", signinValidator, validate, authController.signin);
router.post(
  "/send-varification-email",
  emailValidator,
  validate,
  authController.verifyCode
);
verifyUserValidator,
  router.post(
    "/verify-user",
    verifyUserValidator,
    validate,
    authController.verifyUser
  );
router.post(
  "/forgot-password-code",
  validate,
  emailValidator,
  authController.forgotPasswordCode
);
router.post(
  "/recover-password",
  recoverPasswordValidator,
  authController.recoverPassword
);
router.put(
  "/change-password",
  changePasswordValidator,
  validate,
  isAuth,
  authController.changePassword
);
module.exports = router;
