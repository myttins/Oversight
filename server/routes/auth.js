const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', authController.verifyTokenFromCookie, (req, res) => {
  return res.status(200).json({ message: 'Login Authenticaed' });
});

router.post(
  '/login',
  authController.verifyCredentials,
  authController.signTokenSetCookie,
  (req, res) => {
    return res.status(200).json('login successful');
  },
);

router.get('/logout', (req, res, next) => {
  try {
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    return res.status(200).send('Logged out successfully');
  } catch (err) {
    return next({
      location: 'Error located in route auth/logout',
      error: err,
    });
  }
});

router.post(
  '/signup',
  authController.createAccount,
  authController.signTokenSetCookie,
  (req, res) => {
    return res.status(200).json('success');
  },
);

module.exports = router;
