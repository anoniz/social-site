const express = require('express');
const multer = require('multer');
const app = express();

// const path = require('path');



// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder where uploaded files will be stored
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Set the filename for the uploaded file
    // Here, we use the original filename and append the current timestamp to make it unique
    const uniqueSuffix = Date.now();
    const fileName = uniqueSuffix + '-' + file.originalname;
    req.fileName = fileName;
    cb(null, fileName);
  }
});

// Create a multer instance with the configured storage
const upload = multer({ storage: storage });

// Your route to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  // The uploaded file will be available in req.file
  // Additional processing logic can be done here
  //let relativePath = `/test/uploads/${req.fileName}`;
  //let absolutePath = path.resolve(relativePath);

  //console.log(__dirname);
  res.json({ message: 'File uploaded successfully.' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});