const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/', async (req, res) => {
  const query = await db.query(`SELECT * FROM vehicles ORDER BY id DESC`);
  res.status(200).json(query.rows);
});

module.exports = router;
