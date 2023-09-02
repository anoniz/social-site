const multer = require('multer');
const fs = require('fs-extra');


// for user avatar 
// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder where uploaded files will be stored
    cb(null, `${__dirname}`);
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

const postUploads = new multer({
    storage:storage,

    limits: {
      fileSize: 2000_000
    },
    fileFilter(req,file,callback) {
       if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new Error('Please Upload An Image..'));
       }
       callback(undefined,true);
    }
});

// for user posts..
const upload = new multer({
    
    limits: {
        fileSize: 10_000_000
      },
      fileFilter(req,file,callback) {
         if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('Please Upload An Image..'));
         }
         callback(undefined,true);
      }
})

const errorMiddleware = (err,req,res,next) => {
    return res.status(401).send({error: err.message})
}

module.exports = {
    upload,
    postUploads,
    errorMiddleware,
}