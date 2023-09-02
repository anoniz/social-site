const multer = require('multer');
// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Set the destination folder where uploaded files will be stored
      console.log(__dirname);
      cb(null, `${__dirname}/uploads`);
    },
    filename: function (req, file, cb) {
      // Set the filename for the uploaded file
      // Here, we use the original filename and append the current timestamp to make it unique
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.originalname + '-' + uniqueSuffix);
    }
  });
  
  // Create a multer instance with the configured storage
  const upload = multer({ storage: storage });

  module.exports = upload