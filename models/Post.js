const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Corrected the type definition
    desc: String,
    file: { type: mongoose.Types.ObjectId, ref: "file" }, // Corrected to `Types.ObjectId`
    category: { type: mongoose.Types.ObjectId, ref: "user", required: true }, // Corrected to `Types.ObjectId`
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

// Corrected to `module.exports`
module.exports = Post;
