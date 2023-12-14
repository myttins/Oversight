const db = require('../models');
const query = require('../query');
const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken');

// Loading environment variables from a .env file
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const authController = {
  // Method for resetting the password
  resetPassword: async (req, res, next) => {
    const { password, token } = req.body;
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid or expired token.' });
        }
        const username = decoded.username;
        const hash = await bcrypt.hash(password, 10);

        // Using parameterized query for database update
        const queryStr = 'UPDATE users SET reset = $1, password = $2 WHERE username = $3';
        const values = [false, hash, username];
        const data = await db.query(queryStr, values);

        res.locals.username = username;
        return next();
      });
    } catch (error) {
      return next({
        location: 'Error in authController.resetPassword',
        error,
      });
    }
  },

  // Method for verifying user credentials
  verifyCredentials: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const queryStr = 'SELECT username, role, password FROM users WHERE username = $1';
      const values = [username];
      const data = await db.query(queryStr, values);

      // Checks if username exists and returns if it does not exist
      if (data.rows.length === 0) {
        return res.status(401).json({ message: 'Login failed.' });
      }

      // Checks password, returns if password is incorrect.
      const hash = data.rows[0].password;
      const verified = await bcrypt.compare(password, hash);
      if (verified) {
        if (data.rows[0].reset === true) {
          const tempToken = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
            expiresIn: '15m', // 15 minutes validity
          });

          return res.status(403).json({ token: tempToken, message: 'Password reset required' });
        }
        req.user = { username, role: data.rows[0].role };
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
  },

  // Method for verifying token from cookies
  verifyTokenFromCookie: async (req, res, next) => {
    try {
      const token = req.cookies['token'];

      if (!token) {
        throw new Error();
      }

      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
          throw new Error();
        }
        const username = decoded.username;

        // Using parameterized query for database update
        const queryStr = 'SELECT username, role FROM users WHERE username = $1';
        const values = [username];
        const data = await db.query(queryStr, values);

        if (data.rows.length !== 1) {
          throw new Error();
        }

        req.user = { username, role: data.rows[0].role };
        return next();
      });
      // return next();
    } catch (err) {
      // Clear token if token is invalid
      res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
      return next({
        location: 'Error located in authController.verifyTokenFromCookie',
        message: 'Invalid token',
        error: err,
        status: 401,
      });
    }
  },

  // Method for signing a token and setting it in a cookie
  signTokenSetCookie: (req, res, next) => {
    try {
      const { username } = req.user;
      const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
        expiresIn: '60d',
      });
      res.cookie('token', token, {
        httpOnly: true,
      });
      return next();
    } catch (error) {
      return next({
        location: 'Error located in authController.signTokenSetCookie',
        error,
      });
    }
  },
  getAccounts: async (req, res, next) => {
    try {
      const { role } = req.user;
      const queryStr = 'SELECT id, username, role, date_created, reset FROM users WHERE role < $1';
      const values = [role];
      const data = await db.query(queryStr, values);
      res.locals.data = data.rows;
      return next();
    } catch (error) {
      return next({
        location: 'Error located in authController.getAccounts',
        error,
      });
    }
  },
};

// authController.createAccount = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     const hash = await bcrypt.hash(password, 10);
//     const queryStr = query.createAccount(username, hash, 0);
//     const data = await db.query(queryStr);
//     res.locals.user = { username };
//     return next();
//   } catch (err) {
//     return next({
//       location: 'Error in authController.createAccount',
//       error: err,
//     });
//   }
// };

module.exports = authController;
