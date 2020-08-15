const multer = require("multer");

//multer middleware

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },

  // fileFilter: (req, file, cb) => {
  //   // reject a file
  //   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
  //     cb(null, false);
  //   } else {
  //     cb(new Error("Only .jpeg or .png files are accepted"), true);
  //   }
  // },
});

module.exports = { storage };
