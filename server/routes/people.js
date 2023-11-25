const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/peopleController');

router.get('/:id', peopleController.getPerson, (req, res) => {
  return res.status(200).json(res.locals.person);
});

router.delete('/', peopleController.deletePersonWithVehicleId, (req, res) => {
  return res
    .status(200)
    .json({ message: `${req.query.type} deleted successfully` });
});

router.post(
  '/',
  peopleController.addPerson,
  peopleController.addPersonToVehicle,
  (req, res) => {
    return res.status(200).json({ message: 'person added successfully' });
  },
);

router.put('/:id', peopleController.updatePerson, (req, res) => {
  return res.status(200).json({message: 'person updated successfully'})
})

module.exports = router;
