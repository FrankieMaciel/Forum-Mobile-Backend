const path = require('path');
const { v4: uuidv4 } = require('uuid');

const multer = require('multer');
const imagesPath = path.resolve('public', 'custom-pfp');

const parser = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, imagesPath);
    },
    filename: function (req, file, callback) {
      const fileName = `${file.originalname}`;
      callback(null, fileName);
    },
  }),
});

module.exports = { parser };