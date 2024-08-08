const { User } = require("../models");
const hashPassword = require("../utils/hashPassword");
const comparePassword = require("../utils/comparePassword");
const generateToken = require("../utils/generateToken");
const generateCode = require("../utils/generateCode");
const sendEmail = require("../utils/sendEmail");

const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the email already exists
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword, role });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({
      code: 201,
      status: true,
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.code = 401;
      throw new Error("Invalid credentials");
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.code = 401;
      throw new Error("Invalid credentials");
    }
    const token = generateToken(user);
    res.status(200).json({
      code: 200,
      status: true,
      message: "user signIn successful",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};
const verifyCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.statusCode = 404;
      throw new Error("User not found");
    }

    if (user.isVerified) {
      res.statusCode = 400;
      throw new Error("User already verified");
    }

    const code = generateCode(6);
    user.verificationCode = code; // Correct field name to `verificationCode`
    await user.save();

    //send email

    await sendEmail({
      emailTo: user.email,
      subject: "email validatioin code",
      code,
      content: "varify your account ",
    });

    res.status(200).json({
      code: 200,
      status: true,
      message: "User verification code sent successfully",
    });
  } catch (error) {
    next(error);
  }
};
const verifyUser = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 400;
      throw new Error("user not found");
    }
    if (user.verificationCode !== code) {
      res.code = 400;
      throw new Error("Invalid code ");
    }
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    res
      .status(200)
      .json({ code: 200, status: true, message: "user verified successfully" });
  } catch (error) {
    next(error);
  }
};
const forgotPasswordCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("user not found");
    }
    const code = generateCode(6);
    user.forgotPasswordCode = code;
    await user.save();
    await sendEmail({
      emailTo: user.email,
      subject: "Forget password code",
      code,
      content: "Change your password",
    });
    res.status(200).json({
      code: 200,
      status: true,
      message: "Forgot password code send successfully",
    });
  } catch (error) {
    next();
  }
};
const recoverPassword = async (req, res, next) => {
  try {
    const { email, code, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    if (user.forgotPasswordCode !== code) {
      res.status(400).json({ message: "Invalid code" });
      return;
    }
    const hashedPassword = await hashPassword(password); // Use `hashedPassword` instead of redeclaring `hashPassword`
    user.password = hashedPassword;
    user.forgotPasswordCode = null;
    await user.save(); // Use `save()` instead of `send()`

    res.status(200).json({
      code: 200,
      status: true,
      message: "Password recovered successfully",
    });
  } catch (error) {
    next(error);
  }
};
const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await comparePassword(oldPassword, user.password);
    if (!match) {
      return res.status(400).json({ message: "Old Password doesn't match" });
    }

    if (oldPassword === newPassword) {
      return res
        .status(400)
        .json({ message: "You are providing the old password" });
    }

    const hashedPassword = await hashPassword(newPassword); // Use `hashPassword` as a function
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  signup,
  signin,
  verifyCode,
  verifyUser,
  forgotPasswordCode,
  recoverPassword,
  changePassword,
};
