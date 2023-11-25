const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');

router.get('/schedules', paymentsController.getSchedules, (req, res) => {
  return res.status(200).json(res.locals.data);
});

module.exports = router;
