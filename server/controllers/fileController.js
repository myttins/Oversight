const multer = require('multer');
const db = require('../models');
const query = require('../query');
const fs = require('fs');
const path = require('path');

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

  saveFileToVehicle: (req, res, next) => {
    const { id } = req.params;
    const file = req.file;
    try {
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }

      // Define the directory path
      const PROD_STATIC_PATH = '/opt/render/project/public';
      const DEV_STATIC_PATH = '/Users/kevin/git-repos/public';
      const staticPath = process.env.NODE_ENV === 'production' ? PROD_STATIC_PATH : DEV_STATIC_PATH;
      const directoryPath = path.join(staticPath, `files/${id}`);

      // Create directory if it does not exist
      // if (!fs.existsSync(directoryPath)) {
      //   fs.mkdirSync(directoryPath, { recursive: true });
      // }
      const fileName = `${Date.now()}-${file.originalname}`;

      // Define the file path
      const filePath = path.join(directoryPath, fileName);

      // Save the file
      // fs.writeFileSync(filePath, file.buffer);
      res.locals.fileName = fileName;
      res.locals.filePath = filePath;
      return next();
    } catch (error) {
      return next({
        location: 'Error located in fileController.saveFileToVehicle',
        error,
      });
    }
  },
};

module.exports = fileController;
