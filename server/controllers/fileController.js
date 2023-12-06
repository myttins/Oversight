const multer = require('multer');
// const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = 'public';
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB limit
  },
}).single('file');

const fileController = {
  upload: (req, res, next) => {
    try {
      upload(req, res, (error) => {
        if (error instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          return res.status(500).json({ error: error.message });
        } else if (error) {
          // An unknown error occurred when uploading.
          console.log(error);
          return res.status(500).json({ error: 'File upload error' });
        }
      });

      return next();
    } catch (error) {
      return next({
        location: 'Error located in fileController.upload',
        error,
      });
    }
  },
};

module.exports = fileController;
