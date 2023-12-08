const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/peopleController');
const multer = require('multer');

const upload = multer();

router.get('/', peopleController.getInfo, (req, res) => {
  return res.status(200).json(res.locals.people);
});

router.patch('/:id', upload.single('image'), peopleController.updateInfo, (req, res) => {
  return res.status(200).json({ message: 'Update Successful', people: res.locals.people});
});

router.delete('/', peopleController.deletePersonWithVehicleId, (req, res) => {
  return res.status(200).json({ message: `${req.query.type} deleted successfully` });
});

router.post('/', peopleController.addPerson, peopleController.addPersonToVehicle, (req, res) => {
  return res.status(200).json({ message: 'person added successfully' });
});

// router.put('/:id', peopleController.updatePerson, (req, res) => {
//   return res.status(200).json({ message: 'person updated successfully' });
// });

module.exports = router;
