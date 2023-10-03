const express = require('express');
const router = express.Router();

const db = require('../models');

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

module.exports = router;
