const multer = require("multer");
const path = require("path");
const generateCode = require("../utils/generateCode");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const filename = originalName.replace(extension, "");
    const compressedFilename = filename.split(" ").join("_");
    const lowercaseFilename = compressedFilename.toLocaleLowerCase();
    const code = generateCode(12);
    const finalFile = `${lowercaseFilename}_${code}${extension}`;

    callback(null, finalFile);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const mimetype = file.mimetype;

    if (
      mimetype === "image/jpg" ||
      mimetype === "image/jpeg" ||
      mimetype === "image/png" ||
      mimetype === "application/pdf"
    ) {
    } else {
      callback(new Error("Only .jpg or .jpeg or .png or .pdf format allowed"));
    }
    callback(null, true);
  },
});

module.exports = upload;
