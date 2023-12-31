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

const uploadMiddleware = (req, res, next) => {
  upload(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(500).json({ error: err.message });
    } else if (error) {
      // An unknown error occurred when uploading.
      console.log(error)
      return res.status(500).json({ error: 'File upload error' });
    }
    // Everything went fine.
    return next();
  });
};

module.exports = { upload, uploadMiddleware };
