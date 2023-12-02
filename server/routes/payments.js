const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');

router.get('/', paymentsController.getPayments, (req, res) => {
  return res.status(200).json(res.locals.data);
});

router.get('/schedules', paymentsController.getSchedules, (req, res) => {
  return res.status(200).json(res.locals.data);
});

router.get('/schedules/vehicle/:id', paymentsController.getSchedulesMinusExisting, (req, res) => {
  return res.status(200).json(res.locals.data)
})

router.post('/schedule', paymentsController.addSchedule, paymentsController.addScheduleToJobs, (req, res) => {
  return res.status(200).json({ message: 'Schedule added succesfully' });
});

// Gets all transactions for a given vehicle, including balance
router.get(
  '/:id',
  paymentsController.getPaymentsWithVehicleId,
  paymentsController.getSchedulesWithVehicleId,
  (_req, res) => {
    const { payments, schedules } = res.locals;
    return res.status(200).json({ payments, schedules });
  },
);

router.post('/:id', paymentsController.addPaymentWithVehicleId, (req, res) => {
  return res.status(200).json({ message: 'Payment added successfullly' });
});

module.exports = router;
