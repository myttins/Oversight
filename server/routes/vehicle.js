const express = require('express');
const router = express.Router();
const path = require('path');
const query = require('../query');
// const fileUpload = require('express-fileupload');

const vehicleController = require('../controllers/vehicleController');
const peopleController = require('../controllers/peopleController');
const authController = require('../controllers/authController');

const db = require('../models');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// const AWS = require('aws-sdk');
// const fs = require('fs');
// const fileType = require('file-type');
// const multiparty = require('multiparty');

router.get('/', async (req, res) => {
  if (!req.query.type || !req.query.query) {
    const queryStr = query.select.allVehicleTitles();
    var results = await db.query(queryStr);
    return res.status(200).json(results.rows);
  }

  const plate = req.query.query.toString().toUpperCase();
  if (req.query.type === 'plate') {
    const queryStr = query.select.vehicleTitleWithPlate(plate);
    const results = await db.query(queryStr);
    return res.status(200).json(results.rows);
  }

  const name = req.query.query;
  const queryStr = query.select.vehicleTitleWithName(name);
  var results = await db.query(queryStr);
  return res.status(200).json(results.rows);
});

router.get(
  '/plate/:plate',
  vehicleController.getVehicleWithPlate,
  (req, res) => {
    const { data } = res.locals;
    return res.status(200).json(data);
  },
);

router.get(
  '/:id',
  authController.verifyTokenFromCookie,
  vehicleController.getVehicleInfoWithId,
  vehicleController.getInsurerWithVehicleId,
  peopleController.getDriversWithVehicleId,
  peopleController.getOwnerWithVehicleId,
  (_req, res) => {
    const result = {
      vehicle: res.locals.vehicle,
      drivers: res.locals.drivers,
      owner: res.locals.owner,
      insurer: res.locals.insurer,
    };

    return res.status(200).json(result);
  },
);

router.post('/new', vehicleController.addVehicle, (req, res) => {
  const vehicleId = res.locals.vehicleId;
  return res.status(200).json({ message: 'Vehicle added.', id: vehicleId });
});

router.post('/insurer', vehicleController.addInsurer, (req, res) => {
  return res.status(200).json({ message: 'Insurer updated.' });
});

router.delete(
  '/insurer',
  vehicleController.deleteInsurerWithVehicleId,
  (req, res) => {
    return res.status(200).json({ message: 'Insurer deleted successfully.' });
  },
);

router.post(
  '/:id',
  authController.verifyTokenFromCookie,
  vehicleController.updateVehicleInfoWithId,
  (req, res) => {
    const { id } = req.params;
    return res
      .status(200)
      .json({ message: `Vehicle ${id} updated successfully.` });
  },
);

// router.post('/file', async (req, res) => {

//   AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   });

//   const s3 = new AWS.S3();

//   // Binary data base64
//   const fileContent = Buffer.from(req.files.uploadedFileName.data, 'binary');

//   // Setting up S3 upload parameters
//   const params = {
//     Bucket: process.env.S3_BUCKET,
//     Key: 'test.pdf', // File name you want to save as in S3
//     Body: fileContent,
//   };

//   // Uploading files to the bucket
//   s3.upload(params,  (err, data) => {
//     if (err) {
//       throw err;
//     }
//     res.send({
//       response_code: 200,
//       response_message: 'Success',
//       response_data: data,
//     });
//   });
// });

module.exports = router;
