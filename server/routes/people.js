const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/peopleController');

router.delete('/', peopleController.deletePersonWithVehicleId, (req, res) => {
  return res
    .status(200)
    .json({ message: `${req.query.type} deleted successfully` });
});

module.exports = router;
