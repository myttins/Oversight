const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');

router.get('/', paymentsController.getPayments, (req, res) => {
  return res.status(200).json(res.locals.data);
});

// Gets all transactions for a given vehicle, including balance
router.get('/:id', paymentsController.getPaymentsWithVehicleId, (req, res) => {
  return res.status(200).json(res.locals.data);
});

router.post('/:id', paymentsController.addPaymentWithVehicleId, (req, res) => {
  return res.status(200).json({message: 'Payment added successfullly'});
})

router.get('/schedules', paymentsController.getSchedules, (req, res) => {
  return res.status(200).json(res.locals.data);
});

module.exports = router;
