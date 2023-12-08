const express = require('express');
const cors = require('cors');

/**
 * TODO: Authentication with bcrypt
 */
// const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors());

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const vehicle = require('./routes/vehicle');
const search = require('./routes/search');
const people = require('./routes/people');
const auth = require('./routes/auth');
const payments = require('./routes/payments');

app.use(cookieParser());
app.use('/api/vehicle', vehicle);
app.use('/api/search', search);
app.use('/api/people', people);
app.use('/api/auth', auth);
app.use('/api/payments', payments);

// Used for testing new features only
const fileController = require('./controllers/fileController');
app.use('/api/test', fileController.upload, (req, res) => {
  return res.status(200).json('test endpoint');
});


const PROD_STATIC_PATH = '/opt/render/project/public'
const DEV_STATIC_PATH = '/Users/kevin/git-repos/public'

const staticPath = process.env.NODE_ENV === 'production' ? PROD_STATIC_PATH : DEV_STATIC_PATH;

app.use('/public', express.static(staticPath));

app.use(express.static(path.join(__dirname, '../build')));

// Serve the React application
app.get('*', (_req, res) => {
  return res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.use((_req, res) => {
  return res.status(404).json({ message: 'API route not found.' });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  return res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
});

const { initializeScheduledJobs } = require('./schedulers/paymentScheduler');

const PORT = parseInt(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  initializeScheduledJobs(); // Initialize scheduled tasks
});
