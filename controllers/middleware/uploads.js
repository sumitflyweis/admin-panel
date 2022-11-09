const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: "mongodb+srv://rubi:rubi@cluster0.264g2.mongodb.net/ThirdProject?retryWrites=true&w=majority",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-any-name-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-any-name-${file.originalname}`,
    };
  },
});

module.exports = multer({ storage });
