const db = require('../models');
const query = require('../query');
const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const authController = {};

authController.createAccount = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const queryStr = query.createAccount(username, hash, 0);
    const data = await db.query(queryStr);
    res.locals.user = { username };
    return next();
  } catch (err) {
    return next({
      location: 'Error in authController.createAccount',
      error: err,
    });
  }
};

authController.verifyCredentials = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const queryStr = query.getPasswordWithUsername(username);
    const data = await db.query(queryStr);

    // If username does not exist
    if (data.rows.length === 0) {
      return res.status(404).json({ message: 'Login failed.' });
    }

    const hash = data.rows[0].password;
    const verified = await bcrypt.compare(password, hash);
    if (verified) {
      return next();
    } else {
      return res.status(401).json({ message: 'Login failed.' });
    }
  } catch (err) {
    return next({
      location: 'Error located in authController.verifyCredentials',
      error: err,
    });
  }
};

authController.verifyTokenFromCookie = async (req, res, next) => {
  try {
    const token = req.cookies['token'];
    if (!token) {
      return res.status(401).send('Access denied. No token provided.');
    }
    const status = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    return next();
  } catch (err) {
    // Clear token if token is invalid
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    return next({
      location: 'Error located in authController.verifyTokenFromCookie',
      message: 'Invalid token.',
      error: err,
      status: 401,
    });
  }
};

authController.signTokenSetCookie = (req, res, next) => {
  try {
    const { username } = res.locals;
    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
      expiresIn: '60d',
    });

    res.cookie('token', token, {
      httpOnly: true,
    });
    return next();
  } catch (err) {
    return next({
      location: 'Error located in authController.signTokenSetCookie',
      error: err,
    });
  }
};

module.exports = authController;
