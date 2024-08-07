const { User } = require("../models");
const hashPassword = require("../utils/hashPassword");

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

module.exports = { signup };
