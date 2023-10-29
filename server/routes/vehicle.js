const express = require('express');
const router = express.Router();
const path = require('path');
const fileUpload = require('express-fileupload');

const db = require('../models');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const AWS = require('aws-sdk');
const fs = require('fs');
// const fileType = require('file-type');
const multiparty = require('multiparty');

router.get('/', async (req, res) => {
  if (!req.query.type || !req.query.query) {

    const queryStr = `
    SELECT v.id, v.plate, STRING_AGG(d.driver_name, ', ') AS driver_name FROM vehicles AS v
    LEFT JOIN drivers as d
    ON v.id = d.vehicle_id
    GROUP BY v.id`
    var results = await db.query(queryStr);
  } else {
    const type = req.query.type;
    const query = req.query.query.toString();

    const queryStr = `
    SELECT v.id, v.plate, STRING_AGG(d.driver_name, ', ') AS driver_name FROM vehicles AS v
    LEFT JOIN drivers as d
    ON v.id = d.vehicle_id
    WHERE v.${type} LIKE '%${query}%'
    GROUP BY v.id`
    var results = await db.query(queryStr);
  }
  res.status(200).json(results.rows);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const vehicleQuery = await db.query(`
  SELECT * from vehicles 
  WHERE id = ${id}
  `);

  const driverQuery = await db.query(`
  SELECT * from drivers 
  WHERE vehicle_id = ${id}
  `);

  res.status(200).json({
    vehicle: vehicleQuery.rows[0],
    drivers: driverQuery.rows,
  });
});

router.post('/file', async (req, res) => {

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const s3 = new AWS.S3();

  // Binary data base64
  const fileContent = Buffer.from(req.files.uploadedFileName.data, 'binary');

  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: 'test.pdf', // File name you want to save as in S3
    Body: fileContent,
  };

  // Uploading files to the bucket
  s3.upload(params,  (err, data) => {
    if (err) {
      throw err;
    }
    res.send({
      response_code: 200,
      response_message: 'Success',
      response_data: data,
    });
  });
});

module.exports = router;
