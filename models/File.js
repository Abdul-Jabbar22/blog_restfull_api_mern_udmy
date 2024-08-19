const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    size: Number,
    mimetype: String,
    createdBy: { type: mongoose.Types.ObjectId, ref: "user" }, // Corrected to `Types.ObjectId`
  },
  { timestamps: true }
);

const File = mongoose.model("file", fileSchema); // Corrected to `fileSchema`

module.exports = File;
