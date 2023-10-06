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
  const query = await db.query(`SELECT * FROM vehicles ORDER BY id ASC`);
  res.status(200).json(query.rows);
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
