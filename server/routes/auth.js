const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post(
  '/login',
  authController.verifyCredentials,
  authController.signTokenSetCookie,
  (req, res) => {
    return res.status(200).json('login successful');
  },
);

router.post(
  '/signup',
  authController.createAccount,
  authController.signTokenSetCookie,
  (req, res) => {
    return res.status(200).json('success');
  },
);

module.exports = router;
