const express = require('express');
const router = express.Router();
const path = require('path');
const query = require('../query')
// const fileUpload = require('express-fileupload');

const vehicleController = require('../controllers/vehicleController');
const peopleController = require('../controllers/peopleController');
const authController = require('../controllers/authController')

const db = require('../models');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const AWS = require('aws-sdk');
// const fs = require('fs');
// const fileType = require('file-type');
// const multiparty = require('multiparty');

router.get('/', async (req, res) => {
  if (!req.query.type || !req.query.query) {
    const queryStr = query.getVehiclesAll()
    var results = await db.query(queryStr);
  } else {
    const type = req.query.type === 'plate' ? 'v.plate' : 'd.name';
    const query = req.query.query.toString().toUpperCase();

    if (req.query.type === 'plate') {
      const queryStr = `
      SELECT 
        v.id,
        v.plate, 
        o.name AS owner_name, 
        STRING_AGG(d.name, ', ') as driver_name
      FROM vehicles v
      JOIN vehicle_driver vd ON v.id = vd.vehicle_id
      JOIN users d ON vd.user_id = d.id
      JOIN users o ON v.owner_id = o.id
      WHERE v.plate LIKE '%${query}%'
      GROUP BY o.name, v.id
      ORDER BY v.plate ASC
      `;
      var results = await db.query(queryStr);
    } else {
      const queryStr = `
      SELECT 
        v.id,
        v.plate, 
        o.name AS owner_name, 
        STRING_AGG(d.name, ', ') as driver_name
      FROM vehicles v
      JOIN vehicle_driver vd ON v.id = vd.vehicle_id
      JOIN users d ON vd.user_id = d.id
      JOIN users o ON v.owner_id = o.id
      GROUP BY o.name, v.id
      HAVING STRING_AGG(d.name, ', ') LIKE '%${query}%'
          OR o.name LIKE '%${query}%';
      `;

      var results = await db.query(queryStr);
    }
  }

  return res.status(200).json(results.rows);
});

router.get(
  '/:id',
  authController.verifyTokenFromCookie,
  vehicleController.getVehicleInfoWithId,
  peopleController.getDriversWithVehicleId,
  peopleController.getOwnerWithVehicleId,
  (_req, res) => {
    const result = {
      vehicle: res.locals.vehicle,
      drivers: res.locals.drivers,
      owner: res.locals.owner
    };

    return res.status(200).json(result);
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
