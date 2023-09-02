const express = require('express');

const app = express();
const upload = require('./control/multer')


app.get('/', (req,res) => {
    res.send(__dirname.toString());
    console.log(__dirname.toString())
})

// Your route to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  // The uploaded file will be available in req.file
  // Additional processing logic can be done here
  res.json({ message: 'File uploaded successfully.' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});