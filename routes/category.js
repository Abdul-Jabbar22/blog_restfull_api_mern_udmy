const express = require("express");
const router = express.Router();
const { categoryController } = require("../controller");
const { addCategoryValidator } = require("../validators/category");

const validate = require("../validators/validate");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
router.post(
  "/",
  isAdmin,
  isAuth,
  addCategoryValidator,
  validate,
  categoryController.addCategory
);
router.put("/:id", isAuth, isAdmin, categoryController.updateCategory);
module.exports = router;
